import { PartialType } from '@nestjs/swagger';

import { AddProductDto } from './add-new-product.dto';

export class UpdateProductDto extends PartialType(AddProductDto) {}
