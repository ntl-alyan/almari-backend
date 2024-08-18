import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from 'src/entities/order';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { OrderDetails } from 'src/entities/OrderDetail';
import { DBSequenceService } from 'src/dbService.service';
import { Cartdata } from 'src/entities/Cartdata';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<typeof Order>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<typeof OrderDetails>,
    @InjectRepository(Cartdata)
    private readonly cartDataRepository: Repository<typeof Cartdata>,

    private readonly dbSequenceService: DBSequenceService
  ){}


  async createOrder(createOrderDto: CreateOrderDto) {
    try{
      const date=new Date();

      const newID =
        await this.dbSequenceService.getTableSequence(
        `order_id_seq`
        );

      const payload={
        ID:newID,
        USERID:createOrderDto.USERID,
        ORDER_PRICE:createOrderDto.ORDER_PRICE,
        PAYMENT_TYPE:createOrderDto.PAYMENT_TYPE,
        ADDRESS:createOrderDto.ADDRESS,
        PAYMENT_STATUS:createOrderDto.PAYMENT_TYPE==='CASH_ON_DELIVERY' ? 'PENDING' : 'DONE',
        ORDER_STATUS:'PENDING_FOR_APPROVAL',
        DATETIME:date
      }
     
      const newOrder = await this.orderRepository.save(payload as unknown);

      const orderDetails=createOrderDto.orderDetails;

      if(newOrder)
      {

        for (let i=0; i<orderDetails.length ; i++)
        {

          const newDetailID=await this.dbSequenceService.getTableSequence(
            `order_details_id_seq`
            );
          const payload={
            ID:newDetailID,
            ORDER_ID:newID,
            ITEM_TITLE:orderDetails[i]['ITEM_TITLE'],
            ITEM_PRICE:orderDetails[i]['ITEM_PRICE'],
            IMAGE:orderDetails[i]['IMAGE'],
            DESCRIPTION:orderDetails[i]['DESCRIPTION'],
            ITEMLINK:orderDetails[i]['ITEMLINK'],
            DATETIME:date
          }


          const newDetails = await this.orderDetailsRepository.save(payload as unknown);
        }
      }


      const update=await this.cartDataRepository.delete({
        USERNAME:createOrderDto.USERID
      }as unknown)

      return {
        status: "SUCCESS",
        message: "Order Placed",
        httpStatus: HttpStatus.OK,
        data: newOrder,
      };
    }
    catch(error)
    {
      console.log(error)
      return {
        status: "FAILURE",
        message: "Exception Occured",
        httpStatus: HttpStatus.BAD_REQUEST,
        data: [],
      };
    }
  }

  async findAll() {
    try{
      const orders = await this.orderRepository.find({
        relations:['orderDetails']
      });

      return orders; 
    }
    catch(error)
    {
      console.log(error)
    }
  }

  async findUserOrders(username)
  {
    try{
      const orders = await this.orderRepository.find({
        relations:['orderDetails'],
        where:{
          USERID:username
        }as unknown
      });

      if(orders.length>0)
      {
        return {
          status: "SUCCESS",
          message: "Order Found",
          httpStatus: HttpStatus.OK,
          data: orders,
        };
      }
      else
      {
        return {
          status: "FAILURE",
          message: "No Orders Found",
          httpStatus: HttpStatus.NOT_FOUND,
          data: [],
        };
      }
    }
    catch(error)
    {
      console.log(error)
    }
  }
 
  async findOrderByID(id:number)
  {
    try{
      const orders = await this.orderRepository.find({
        relations:['orderDetails'],
        where:{
          ID:id
        }as unknown
      });


      if(orders.length>0)
      {
        return {
          status: "SUCCESS",
          message: "Order Found",
          httpStatus: HttpStatus.OK,
          data: orders,
        };
      }
      else
      {
        return {
          status: "FAILURE",
          message: "No Orders Found",
          httpStatus: HttpStatus.NOT_FOUND,
          data: [],
        };
      }
    }
    catch(error)
    {
      console.log(error)
    }
  }
}
