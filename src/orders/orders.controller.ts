import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/createOrder')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get('/allOrders')
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('findUserOrders/:username')
  findUserOrders(@Param("username") username:string) {
    return this.ordersService.findUserOrders(username);
  }

  
  @Get('findOrderByID/:id')
  findOrderByID(@Param("id") id:number) {
    return this.ordersService.findOrderByID(id);
  }
 
}
