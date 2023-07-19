import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/shared/repository/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createCartDto: CreateCartDto) {
    // check if user exists
    const existingUserPromise = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const existingProductPromise = this.prisma.product.findUnique({
      where: {
        id: createCartDto.productId,
      },
    });

    const [existingUser, existingProduct] = await Promise.all([
      existingUserPromise,
      existingProductPromise,
    ]);

    if (!existingUser) throw new NotFoundException('User not found.');
    if (!existingProduct) throw new NotFoundException('Product not found.');

    const newCartItem = await this.prisma.cartItem.create({
      data: {
        userId: userId,
        productId: createCartDto.productId,
        quantity: createCartDto.quantity,
      },
    });

    return newCartItem;
  }

  async findAll(userId: number) {
    const cart = (await this.prisma.cartItem.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        quantity: true,
        product: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    })) as any;

    cart.forEach((cartItem) => {
      cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
    });

    const totalCartPrice = cart.reduce((acc: number, cartItem: any) => {
      acc += cartItem.totalPrice;
      return acc;
    }, 0);
    return { cart, totalCartPrice };
  }

  async findOne(cartId: number, userId: number) {
    const existingCart = await this.prisma.cartItem.findFirst({
      where: {
        id: cartId,
        userId: userId,
      },
      include: {
        product: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });

    if (!existingCart)
      throw new NotFoundException('Cart item not found for this user.');

    // Calculate the total price of the cart item
    const totalPrice = existingCart.product.price * existingCart.quantity;

    // Add the total price to the existingCart object
    return { ...existingCart, totalPrice };
  }

  async update(cartId: number, userId: number, updateCartDto: UpdateCartDto) {
    const existingCart = await this.prisma.cartItem.findFirst({
      where: {
        id: cartId,
        userId: userId,
      },
    });

    if (!existingCart)
      throw new NotFoundException('Cart item not found for this user.');

    return this.prisma.cartItem.update({
      where: {
        id: cartId,
      },
      data: {
        productId: updateCartDto.productId,
        quantity: updateCartDto.quantity,
      },
    });
  }

  remove(id: number, userId: number) {
    return this.prisma.cartItem.delete({
      where: {
        id,
        userId,
      },
    });
  }

  async removeAll(userId: number) {
    return this.prisma.cartItem.deleteMany({
      where: {
        userId: userId,
      },
    });
  }
}
