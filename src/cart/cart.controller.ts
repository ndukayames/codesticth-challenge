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
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { UserJwtAuthGuard } from 'src/shared/guards/user-jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('carts')
@ApiTags('Carts')
@UseGuards(UserJwtAuthGuard)
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
