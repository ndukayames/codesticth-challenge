import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { TransformStringToNumber } from 'src/shared/custom-transformer';

export class AddProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @TransformStringToNumber()
  @IsNumber()
  @Min(0)
  price: number;
}
