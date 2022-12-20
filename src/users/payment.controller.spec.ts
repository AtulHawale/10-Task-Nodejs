import { Test, TestingModule } from '@nestjs/testing';
import { resolve } from 'path';
import { Repository } from 'typeorm';
import {User} from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userDTO } from './dto/users.dto';
import { loginDTO } from './dto/login.dto';
import { changepassDTO } from './dto/changepass.dto';
import { creditamountDto } from './dto/creditamount.dto';
import { PaymentController } from './payment.controller';




describe('PaymentController', () => {
  let usersrepository: Repository<User>;
  let userService: UsersService;
  let paymentcontroller: PaymentController;

  beforeEach(async () => {
    userService = new UsersService(usersrepository)
    paymentcontroller = new PaymentController(userService);
   
  });

  afterEach(()=>{
    paymentcontroller = null;
    userService = null;
  })

  it('user should pay bills',async ()=>{
    const result5:Promise<any> = new Promise((resolve,reject)=>{
      resolve({email:"messi@gmail.com"});
    });
    jest.spyOn(userService,'payelectricity').mockImplementation(()=> result5);

    let userbill = await paymentcontroller.payelectphonebill({email:"messi@gmail.com"},790,879);
    console.log("in test case: user should pay bills  ",userbill);

    expect(userbill["email"]).toContain("messi@gmail.com");

  })
});


