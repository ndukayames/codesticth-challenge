import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @ApiProperty()
  totalAmount: number;

  @IsNotEmpty()
  @ApiProperty()
  shippingInfo: string;
  @IsNotEmpty()
  @ApiProperty()
  paymentInfo: string;
}
