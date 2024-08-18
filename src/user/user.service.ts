import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Userlogin } from 'src/entities/Userlogin';
import { LoginDTO } from './dto/userLogin.dto';
import { SignUpDTO } from './dto/userSignup.dto';
import { UserInfo } from 'src/entities/Userinfo';
import { DBSequenceService } from 'src/dbService.service';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { CartDTO } from './dto/addToCart.dto';
import { Cartdata } from 'src/entities/Cartdata';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Userlogin)
        private userLoginRepository: Repository<typeof Userlogin>,
        @InjectRepository(UserInfo)
        private userInfoRepository: Repository<typeof UserInfo>,
        @InjectRepository(Cartdata)
        private cartDataRepository: Repository<typeof Cartdata>,
        private readonly dbSequenceService: DBSequenceService
      ) {}

      async findAllUsers() {
        let response = {};
        try {
          let allUsers = await this.userLoginRepository.find({
            select:{
                EMAIL:true,
                PASSWORD:true
            } as unknown
        });
        response = {
            status: "SUCCESS",
            message: "Users Found",
            httpStatus: HttpStatus.FOUND,
            data: allUsers,
          };
          return response;
          
        } catch (error) {
            console.log(error)
          response = {
            status: "FAILURE",
            message: "Exception Occured",
            httpStatus: HttpStatus.BAD_REQUEST,
            data: [],
          };
          return error;
        }
      }

      async findUser(username) {
        let response = {};
        try {
          let allUsers = await this.userLoginRepository.find({
            relations:['USERID'],
            where:{
              EMAIL:username,
            }as unknown,
        });

        response = {
            status: "SUCCESS",
            message: "Users Found",
            httpStatus: HttpStatus.FOUND,
            data: allUsers,
          };
          return response;
          
        } catch (error) {
            console.log(error)
          response = {
            status: "FAILURE",
            message: "Exception Occured",
            httpStatus: HttpStatus.BAD_REQUEST,
            data: [],
          };
          return error;
        }
      }

      async loginUser(loginDTO:LoginDTO){
        let response = {};
        try {
            let user = await this.userLoginRepository.find({
                where:{
                    EMAIL:loginDTO.EMAIL,
                    PASSWORD:loginDTO.PASSWORD
                }as unknown
            });

            if(user.length>0)
            {
                
                response = {
                    status: "SUCCESS",
                    message: "User Found",
                    httpStatus: HttpStatus.FOUND,
                    data: user,
                  };
                  return response;
            }
            else{
                response = {
                    status: "FAILURE",
                    message: "User Not Found",
                    httpStatus: HttpStatus.NOT_FOUND,
                    data: [],
                  };
                  return response;
            }
        }
         catch (error) {
            console.log(error)
          response = {
            status: "FAILURE",
            message: "Exception Occured",
            httpStatus: HttpStatus.BAD_REQUEST,
            data: [],
          };
          return response;
        }
      }

      async registerUser(signUpDTO:SignUpDTO){
        let response = {};
        try {
            const isUserExist = await this.userLoginRepository.find({
                where:{
                    EMAIL:signUpDTO.EMAIL
                } as unknown,   
            })


            if(isUserExist.length>0)
            {
                response = {
                    status: "FAILURE",
                    message: "User Already Exist",
                    httpStatus: HttpStatus.BAD_REQUEST,
                    data: [],
                  };
                  return response;
            }
            else
            {
                const newID =
                await this.dbSequenceService.getTableSequence(
                `userinfo_id_seq`
                );
    
               const infoPayload = {
                ID:newID,
                FIRSTNAME:signUpDTO.FIRSTNAME,
                LASTNAME:signUpDTO.LASTNAME,
                AGE:signUpDTO.AGE,
                CITY:signUpDTO.CITY,
                GENDER:signUpDTO.GENDER,

               };
    
               const userInfoResponse=await this.userInfoRepository.save(infoPayload as unknown);
    
                const loginPayload={
                    EMAIL:signUpDTO.EMAIL,
                    PASSWORD:signUpDTO.PASSWORD,
                    USERID:newID,
                    PRIORITY:signUpDTO.PRIORITY
                };
                const userLoginResponse=await this.userLoginRepository.save(loginPayload as unknown);
    
                response = {
                status: "SUCCESS",
                message: "User Found",
                httpStatus: HttpStatus.FOUND,
                data: [],
                };
                return response;    
            }
      }
      catch (error) {
        console.log(error);
      }
    }

    async addToCart(cartDTO:CartDTO){
      let response = {};
      try{
        const newID = await this.dbSequenceService.getTableSequence("card_data_id_seq");

        const payload={
          ID:newID,
          TITLE:cartDTO.TITLE,
          PRICE:cartDTO.PRICE,
          IMAGE:cartDTO.IMAGE,
          ITEMLINK:cartDTO.ITEMLINK,
          DESCRIPTION:cartDTO.DESCRIPTION,
          SKUCODE:cartDTO.SKUCODE,
          USERNAME:cartDTO.USERNAME,
          TYPE:cartDTO.TYPE
        }

        const cartDataResponse=await this.cartDataRepository.save(payload as unknown);

        response = {
          status: "SUCCESS",
          message: "Cart Data Added",
          httpStatus: HttpStatus.FOUND,
          data: [],
        };
        return response;
      }
      catch(error)
      {
        console.log(error)
        response = {
          status: "FAILURE",
          message: "Exception Occured",
          httpStatus: HttpStatus.BAD_REQUEST,
          data: [],
        };
        return response;
      }
    }

    async getAllCartedData(username:string){
      let response = {};

      try{
        const cartDataResponse=await this.cartDataRepository.find({
          where:{
            USERNAME:username
          } as unknown
        });

        if(cartDataResponse.length>0)
        {
          response = {
            status: "SUCCESS",
            message: "Cart Data Found",
            httpStatus: HttpStatus.FOUND,
            data: cartDataResponse,
          };
          return response;
        }
        else{
          response = {
            status: "FAILURE",
            message: "No Data Found",
            httpStatus: HttpStatus.NOT_FOUND,
            data: [],
          };
          return response;
        }
      }
      catch(error)
      {
        console.log(error)
        response = {
          status: "FAILURE",
          message: "Exception Occured",
          httpStatus: HttpStatus.BAD_REQUEST,
          data: [],
        };
        return response;
      }
    }


    async removeFromCart(cartItemID : number )
    {
      let response={};
      try{
        const ifExists=await this.cartDataRepository.find({
          where:{
            ID:cartItemID
          } as unknown
        });

        if(ifExists.length===0)
          {
            response = {
              status: "FAILURE",
              message: "No Cart Item Exists",
              httpStatus: HttpStatus.BAD_REQUEST,
              data: [],
            };
            return response;
          }

        const deleteResult=await this.cartDataRepository.delete(cartItemID);

        if(deleteResult.affected===1)
          {
            response = {
              status: "SUCCESS",
              message: "Item Removed From Cart",
              httpStatus: HttpStatus.FOUND,
              data: [],
            };
          }
          else
          {
            response = {
              status: "FAILURE",
              message: "Failed To Delete Item From Cart",
              httpStatus: HttpStatus.BAD_REQUEST,
              data: [],
            };
          }
          return response;
      }
      catch(error)
      {
        console.log(error)
        response = {
          status: "FAILURE",
          message: "Exception Occured",
          httpStatus: HttpStatus.BAD_REQUEST,
          data: [],
        };
        return response;
      }
    }
}
