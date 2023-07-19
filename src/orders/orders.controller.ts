import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import {} from 'src/shared/guards/admin-jwt-auth.guard';
import { UserJwtAuthGuard } from 'src/shared/guards/user-jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Orders')
@UseGuards(UserJwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser('id', ParseIntPipe) userId: number,
  ) {
    return this.ordersService.create(createOrderDto, userId);
  }

  @Get()
  findAll(@GetUser('id', ParseIntPipe) userId: number) {
    return this.ordersService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
