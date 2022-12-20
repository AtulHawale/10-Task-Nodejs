import { Body, Controller, Get, Param, Post, Query, Req ,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {paybillsDTO} from './dto/paybills.dto'
import { AuthGuard } from '@nestjs/passport';

@Controller('payment')
export class PaymentController {
    constructor(public _UsersService:UsersService){}


@Get('/bills/:electricitybill?/:phonebill?')
@UseGuards(AuthGuard('jwt'))
payelectphonebill(@Body() paybillsDTO:paybillsDTO, @Query('electricitybill')electricitybill=0, @Query('phonebill')phonebill=0){ 
const bill=this._UsersService.payelectricity(paybillsDTO.email,electricitybill,phonebill);
return bill;
}
}