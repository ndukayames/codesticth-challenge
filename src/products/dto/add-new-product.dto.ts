import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { TransformStringToNumber } from 'src/shared/custom-transformer';

export class AddProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @TransformStringToNumber()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  price: number;
}
