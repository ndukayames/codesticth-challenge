import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @HttpCode(200)
  async signinn(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }
}
