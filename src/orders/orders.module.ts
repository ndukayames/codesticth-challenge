import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { CartModule } from 'src/cart/cart.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [CartModule],
})
export class OrdersModule {}
