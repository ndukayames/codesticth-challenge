import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninDto } from './dto/signin.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/signup')
  async userSignup(@Body() dto: CreateUserDto) {
    return this.authService.userSignup(dto);
  }

  @Post('users/signin')
  @HttpCode(200)
  async userSignin(@Body() dto: SigninDto) {
    return this.authService.userSignin(dto);
  }

  @Post('admins/signup')
  async adminSignup(@Body() dto: CreateUserDto) {
    return this.authService.adminSignup(dto);
  }

  @Post('admins/signin')
  @HttpCode(200)
  async adminSignin(@Body() dto: SigninDto) {
    return this.authService.adminSignin(dto);
  }
}
