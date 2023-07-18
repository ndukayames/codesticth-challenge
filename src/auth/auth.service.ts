import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/shared/repository/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: CreateUserDto) {
    try {
      const userInput: Prisma.UserCreateInput = {
        password: await argon.hash(dto.password),
        username: dto.username,
      };
      const user = await this.prisma.user.create({
        data: userInput,
      });

      delete user.password;
      return this.generateToken(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'User with this username already exists',
          );
        }
      }
    }
  }

  async signin(dto: SigninDto): Promise<{
    access_token: string;
  }> {
    // find user
    const findParam: Prisma.UserWhereUniqueInput = {
      username: dto.username,
    };

    const user = await this.prisma.user.findUnique({
      where: findParam,
    });

    // check if user is found
    if (!user) {
      throw new UnauthorizedException(
        "Username doesn't belong to any account.",
      );
    }

    // compare password
    const isPasswordMatch = await argon.verify(user.password, dto.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    return this.generateToken(user);
  }

  async generateToken(user: User): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return { access_token: token };
  }
}
