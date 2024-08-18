

import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class OrderDetails {
    @IsNumber()
    @IsOptional()
	ID: number

    @IsNumber()
    @IsOptional()
	ORDER_ID: number

    @IsString()
    @IsNotEmpty()
	ITEM_TITLE: string
	
	@IsString()
    @IsNotEmpty()
	ITEM_PRICE: string

    @IsString()
    @IsNotEmpty()
	IMAGE: string
	
	@IsString()
    @IsOptional()
	ITEMLINK: string

    @IsString()
    @IsOptional()
	DESCRIPTION: string

	@IsDate()
    @IsOptional()
	DATETIME: Date
}
