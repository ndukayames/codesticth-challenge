import { IsNumber, Min } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  @Min(0)
  productId: number;
  @IsNumber()
  @Min(0)
  quantity: number;
}
