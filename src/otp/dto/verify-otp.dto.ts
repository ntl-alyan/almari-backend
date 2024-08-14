import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class VerifyOtpDto {

    @IsString()
    @IsNotEmpty()
	USERID: string

    @IsString()
    @IsNotEmpty()
	VALUE: string
}
