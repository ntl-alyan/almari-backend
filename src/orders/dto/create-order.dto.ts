import { ArrayMinSize, IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { Type } from 'class-transformer';
import { OrderDetails } from "./create-details.dto";

export class CreateOrderDto {
    @IsNumber()
    @IsOptional()
	ID: number

    @IsString()
    @IsNotEmpty()
	USERID: string
	
	@IsString()
    @IsNotEmpty()
	ADDRESS: string

    @IsString()
    @IsNotEmpty()
	ORDER_PRICE: string

    @IsDate()
    @IsNotEmpty()
	PAYMENT_TYPE: string

    @IsDate()
    @IsOptional()
	PAYMENT_STATUS: string

    @IsDate()
    @IsOptional()
	DATETIME: Date

    @IsDate()
    @IsOptional()
	ORDER_STATUS: Date

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => OrderDetails)
    orderDetails: OrderDetails[];
}
