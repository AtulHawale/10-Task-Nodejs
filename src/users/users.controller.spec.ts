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




describe('UsersController', () => {
  let usersrepository: Repository<User>;
  let userService: UsersService;
  let usercontroller: UsersController;
 
  
  beforeEach(async () => {
    userService = new UsersService(usersrepository)
    usercontroller = new UsersController(userService);
   
  });

  afterEach(()=>{
    usercontroller = null;
    userService = null;
  })

  it('should save user', async ()=>{
   
    const result1:Promise<userDTO> = new Promise((resolve, reject)=>{
      resolve({username: "messi", email: "messi@gmail.com", password: "messi@worldcup"})
    });
    jest.spyOn(userService, 'saveuser').mockImplementation(() => result1);

    let userobj = await usercontroller.register({username: "messi", email: "messi@gmail.com", password: "messi@worldcup"});

    expect(userobj.username).toContain("messi");
  })

  it('should login user', async ()=>{
   
    const result2:Promise<loginDTO> = new Promise((resolve, reject)=>{
      resolve({username: "messi", password: "messi@worldcup"})
    });
    jest.spyOn(userService, 'usercheck').mockImplementation(() => result2);

    let userobj = await usercontroller.loginuser({username: "messi", password: "messi@worldcup"});

    expect(userobj.username).toContain("messi");
  })

  it('user should change password', async ()=>{
   
    const result3:Promise<any> = new Promise((resolve, reject)=>{
      resolve({email: "messi@gmail.com", oldpassword: "messi@worldcup",newpassword:"messiteam@worldcup"})
    });

    jest.spyOn(userService, 'changepassword').mockImplementation(() => result3);
    

    let userobjnew = await usercontroller.changePassword({email: "messi@gmail.com", oldpassword: "messi@worldcup",newpassword:"messiteam@worldcup"});
    console.log("in test case: user should change password return  ",userobjnew);

    expect(userobjnew["newpassword"]).toContain("messiteam@worldcup"); 
  })

  it('user should check balane',async ()=>{
    const result4:Promise<any> = new Promise((resolve,reject)=>{
      resolve({email:"messi@gmail.com"});
    });
    jest.spyOn(userService,'checkbalance').mockImplementation(()=> result4);

    let userbalance = await usercontroller.checkbalance({email:"messi@gmail.com"})
    console.log("in test case: user should check balane  ",userbalance);

    expect(userbalance["email"]).toContain("messi@gmail.com");

  })

  it('user should credit amount',async ()=>{
    const result5:Promise<any> = new Promise((resolve,reject)=>{
      resolve({email:"messi@gmail.com"});
    });
    jest.spyOn(userService,'credit').mockImplementation(()=> result5);

    let usercredit = await usercontroller.creditamount({email:"messi@gmail.com"},700)
    console.log("in test case: user should credit amounte  ",usercredit);

    expect(usercredit["email"]).toContain("messi@gmail.com");

  })

 
});
