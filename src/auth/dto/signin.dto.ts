import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;
}
