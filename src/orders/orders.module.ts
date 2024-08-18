import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order';
import { OrderDetails } from 'src/entities/OrderDetail';
import { DBSequenceService } from 'src/dbService.service';
import { Cartdata } from 'src/entities/Cartdata';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Order,
      OrderDetails,
      Cartdata
    ])
  ],
  controllers: [OrdersController],
  providers: [OrdersService,DBSequenceService],
})
export class OrdersModule {}
