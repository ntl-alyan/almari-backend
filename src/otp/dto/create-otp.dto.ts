import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateOtpDto {
    @IsNumber()
    @IsOptional()
	ID: number

    @IsString()
    @IsNotEmpty()
	USERID: string
	
	@IsString()
    @IsNotEmpty()
	KEY: string

    @IsString()
    @IsOptional()
	VALUE: string

    @IsDate()
    @IsOptional()
	DATETIME: Date
}
