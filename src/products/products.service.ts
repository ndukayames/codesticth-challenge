import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/repository/prisma/prisma.service';
import { AddProductDto } from './dto/add-new-product.dto';
import { Prisma } from '@prisma/client';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private fileUploadService: FileUploadService,
  ) {}

  async addProduct(product: AddProductDto, file?: Express.Multer.File) {
    let uploadedFile: any;
    if (file) {
      uploadedFile = await this.fileUploadService.uploadPicture(file);
    }
    const productData: Prisma.ProductCreateInput = {
      name: product.name,
      price: product.price,
      image: uploadedFile?.url,
    };

    const newProduct = await this.prisma.product.create({
      data: productData,
    });

    return newProduct;
  }

  async updateProduct(
    productId: number,
    product: UpdateProductDto,
    file?: Express.Multer.File,
  ) {
    let uploadedFile: any;
    // find product
    const existingProduct = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (existingProduct) {
      if (file) {
        uploadedFile = await this.fileUploadService.uploadPicture(file);
      }
      const productData: Prisma.ProductUpdateInput = {
        name: product.name,
        price: product.price,
        image: uploadedFile?.url,
      };
      const newProductData = await this.prisma.product.update({
        where: {
          id: productId,
        },
        data: productData,
      });
      return newProductData;
    }

    throw new NotFoundException('Product Not Found.');
  }

  async deleteProduct(productId: number) {
    return this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }

  async getProducts(
    query: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ id: number; name: string; price: number; image: string }[]> {
    const skip = (page - 1) * pageSize;
    const products = await this.prisma.product.findMany({
      where: {
        // name: {
        //   search: `+${query}`,
        // },
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },

      skip,
      take: pageSize,
    });

    return products as any;
  }

  async getProductDetails(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) throw new NotFoundException('product not found.');

    return product;
  }
}
