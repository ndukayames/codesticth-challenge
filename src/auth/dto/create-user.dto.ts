import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  password: string;
  @IsString()
  username: string;
}
