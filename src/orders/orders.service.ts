import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/shared/repository/prisma/prisma.service';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: number) {
    const cartItems = await this.cartService.findAll(userId);
    const connectCartItems = cartItems.cart.map((item) => {
      return {
        id: item.id,
      };
    });
    await this.prisma.order.create({
      data: {
        paymentInfo: createOrderDto.paymentInfo,
        shippingInfo: createOrderDto.shippingInfo,
        totalAmount: createOrderDto.totalAmount,
        userId: userId,
        orderItems: {
          connect: connectCartItems,
        },
      },
    });

    await this.cartService.removeAll(userId);
  }

  findAll(userId: number) {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        paymentInfo: true,
        shippingInfo: true,
        totalAmount: true,
        orderItems: {
          select: {
            id: true,
            product: {
              select: {
                id: true,
                name: true,
              },
            },
            quantity: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: true,
      },
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    console.log(updateOrderDto);
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
