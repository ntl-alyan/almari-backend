import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { DBSequenceService } from 'src/dbService.service';
import { InjectRepository } from '@nestjs/typeorm';
import { OTP } from 'src/entities/otp';
import { Repository } from "typeorm";
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OTP)
    private otpRepository: Repository<typeof OTP>,
    private readonly dbSequenceService: DBSequenceService
  ){
    
  }
  async create(createOtpDto: CreateOtpDto) {

    const ifExists=await this.otpRepository.findOne({
      where:{
        USERID:createOtpDto.USERID,
        STATUS:'pending'
      }as unknown
    })

    if(ifExists)
    {
      const updateRow= await this.otpRepository.update(
        {
          ID: ifExists['ID'],
        } as unknown,
        {
          STATUS:'done'
        }as unknown
      );
    }

    const newID =
                await this.dbSequenceService.getTableSequence(
                `otp_id_seq`
                );
    
    const otpCode=await this.generateActivationCode(5);

    createOtpDto.DATETIME=new Date();
    createOtpDto.ID=newID;
    createOtpDto.VALUE=otpCode


    const save=await this.otpRepository.save(createOtpDto as unknown)


    if(save)
    {
      return {
        status: "SUCCESS",
        message: "OTP Generated",
        httpStatus: HttpStatus.FOUND,
        data: [],
        };
      }
      else
      {
        return {
          status: "FAILURE",
          message: "Failed to Generate OTP",
          httpStatus: HttpStatus.EXPECTATION_FAILED,
          data: [],
          };
        }
  }

  async generateActivationCode(length) {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomAlphabets = '';
    let timestampDigits = '';

    // Generate 5 random alphabets
    for (let i = 0; i < 5; i++) {
      randomAlphabets += alphabets.charAt(
        Math.floor(Math.random() * alphabets.length),
      );
    }

    // Get current timestamp and convert it into a string
    const timestamp = String(Math.floor(Date.now() / 1000));

    // Take 5 random digits from the timestamp and shuffle them
    const shuffledTimestamp = timestamp
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
    timestampDigits = shuffledTimestamp.substr(0, 5);

    // Combine alphabets and shuffled timestamp digits
    const randomCode = randomAlphabets + timestampDigits;
    const shuffledString = await this.shuffleString(randomCode);

    return shuffledString;
  }


  async shuffleString(str) {
    return str
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
  }

  async verifyOTP(verifyOTPDTO:VerifyOtpDto)
  {

    const ifExists=await this.otpRepository.findOne({
      where:{
        USERID:verifyOTPDTO.USERID,
        VALUE:verifyOTPDTO.VALUE,
        STATUS:'pending'
      }as unknown
    })

    if(ifExists)
    {
      const updateRow= await this.otpRepository.update(
        {
          ID: ifExists['ID'],
        } as unknown,
        {
          STATUS:'done'
        }as unknown
      );

      return {
        status: "SUCCESS",
        message: "OTP Verified",
        httpStatus: HttpStatus.FOUND,
        data: [],
        };
    }
    else {
      return {
        status: "FAILURE",
        message: "Failed to Verify OTP",
        httpStatus: HttpStatus.EXPECTATION_FAILED,
        data: [],
        };
    }

  }


  findAll() {
    return `This action returns all otp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otp`;
  }

  update(id: number, updateOtpDto: UpdateOtpDto) {
    return `This action updates a #${id} otp`;
  }

  remove(id: number) {
    return `This action removes a #${id} otp`;
  }
}
