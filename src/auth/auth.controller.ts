import { Controller, Post, UseGuards,Body, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { loginDTO } from '../users/dto/login.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(public _AuthService:AuthService){}

@Post('/profile')
async gettoken(@Body() login:loginDTO, @Req() req:Request){
    console.log(login);
    const token=await this._AuthService.generatetoken(login);
    return token;
}

  @Get('/user')
  @UseGuards(AuthGuard("jwt"))
  getProfile(@Req() req:Request) {
    return req['user'];
  }
}

