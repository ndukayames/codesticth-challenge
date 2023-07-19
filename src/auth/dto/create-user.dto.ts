import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;
}
