import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from '../repository/prisma/prisma.service';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'userJwt') {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number }) {
    const user = this.prisma.user.findUnique({
      where: {
        id: payload.sub,
        type: 'USER',
      },
    });

    return user;
  }
}
