import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userlogin } from 'src/entities/Userlogin';
import { UserInfo } from 'src/entities/Userinfo';
import { DBSequenceService } from 'src/dbService.service';
import { Cartdata } from 'src/entities/Cartdata';
import { OtpService } from 'src/otp/otp.service';
import { OTP } from 'src/entities/otp';

@Module({
  imports: [
    TypeOrmModule.forFeature([Userlogin,UserInfo,Cartdata,OTP]),
  ],
  controllers: [UserController],
  providers: [UserService,DBSequenceService,OtpService],
})
export class UserModule {}
