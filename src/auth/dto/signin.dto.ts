import { IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  password: string;
  @IsString()
  username: string;
}
