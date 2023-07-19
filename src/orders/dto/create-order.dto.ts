import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  totalAmount: number;
  @IsNotEmpty()
  shippingInfo: string;
  @IsNotEmpty()
  paymentInfo: string;
}
