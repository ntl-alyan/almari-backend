import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDTO } from './dto/userLogin.dto';
import { SignUpDTO } from './dto/userSignup.dto';
import { CartDTO } from './dto/addToCart.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('userProfile/:username')
  findUser(@Param("username") username:string) {
    return this.userService.findUser(username);
  }

  @Post('login')
  loginUser(@Body() loginDTO:LoginDTO){
    return this.userService.loginUser(loginDTO);
  }

  @Post ('signup')
  signupUser(@Body() signupDTO:SignUpDTO){
    return this.userService.registerUser(signupDTO);
  }

  @Post ('addToCart')
  addToCart(@Body() cartDTO:CartDTO){
    return this.userService.addToCart(cartDTO);
  }

  @Get ('getCart/:username')
  getCart(@Param("username") username:string){
    return this.userService.getAllCartedData(username);
  }

  @Delete ('removeCartData/:cartItemID')
  removeCartData(@Param("cartItemID") cartItemID:number){
    return this.userService.removeFromCart(cartItemID);
  }
  
}
