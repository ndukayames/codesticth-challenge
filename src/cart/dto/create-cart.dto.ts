import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  @Min(0)
  @ApiProperty()
  productId: number;
  @IsNumber()
  @Min(0)
  @ApiProperty()
  quantity: number;
}
