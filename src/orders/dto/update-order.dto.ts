import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateOrderDto  {
    @IsNumber()
    @IsNotEmpty()
    ORDER_ID:number

    @IsString()
    @IsNotEmpty()
    ORDER_STATUS: string

}
