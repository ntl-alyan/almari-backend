import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order';
import { OrderDetails } from 'src/entities/OrderDetail';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Order,
      OrderDetails
    ])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
