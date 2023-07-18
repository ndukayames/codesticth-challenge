import { PartialType } from '@nestjs/mapped-types';
import { AddProductDto } from './add-new-product.dto';

export class UpdateProductDto extends PartialType(AddProductDto) {}
