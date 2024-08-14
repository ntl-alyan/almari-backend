import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { DBSequenceService } from 'src/dbService.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTP } from 'src/entities/otp';

@Module({
  imports:[
    TypeOrmModule.forFeature([OTP])
  ],
  controllers: [OtpController],
  providers: [OtpService,DBSequenceService],
})
export class OtpModule {}
