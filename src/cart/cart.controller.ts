import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { GetUser } from 'src/shared/decorators/get-user.decorator';

@Controller('carts')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(
    @Body() createCartDto: CreateCartDto,
    @GetUser('id', ParseIntPipe) userId: number,
  ) {
    return this.cartService.create(userId, createCartDto);
  }

  @Get()
  findAll(@GetUser('id', ParseIntPipe) userId: number) {
    return this.cartService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id', ParseIntPipe) userId: number,
  ) {
    return this.cartService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.update(id, userId, updateCartDto);
  }

  @Delete()
  removeAll(@GetUser('id', ParseIntPipe) userId: number) {
    return this.cartService.removeAll(userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id', ParseIntPipe) userId: number,
  ) {
    return this.cartService.remove(id, userId);
  }
}
