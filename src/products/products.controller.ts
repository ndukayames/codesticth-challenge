import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { AddProductDto } from './dto/add-new-product.dto';
import { AdminJwtAuthGuard } from 'src/shared/guards/admin-jwt-auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@UseGuards(AdminJwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async addProduct(
    @Body() dto: AddProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.addProduct(dto, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateProduct(
    @Body() dto: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.updateProduct(id, dto, file);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }

  @Get('search')
  async searchProducts(
    @Query('searchKey') searchKey: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    const products = await this.productsService.getProducts(
      searchKey,
      page,
      pageSize,
    );
    return products;
  }

  @Get(':id')
  async getProductDetails(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductDetails(id);
  }
}
