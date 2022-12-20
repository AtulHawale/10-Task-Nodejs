import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { loginDTO } from './dto/login.dto';
import { userDTO } from './dto/users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
constructor(@InjectRepository(User) 
private usersRepository: Repository<User>){}

async saveuser(user:userDTO):Promise<userDTO>{
const reguser= await this.usersRepository.save(user);
console.log(reguser);
return reguser;
}  
async usercheck(username:string):Promise<loginDTO>{
return await this.usersRepository.findOne({ where: { username } });
}

async changepassword(email:string,password:string, newpassword:string){
const founduser= await this.usersRepository.find({ where: { email ,password} });
if(founduser.length>0){
    return await this.usersRepository.update(email, {password:newpassword}); 
}
else{ 
    throw new HttpException("Email or password incorrect",HttpStatus.BAD_REQUEST)
}}

async forgotpassword(email:string,username:string, resetpassword:string){
    const founduser= await this.usersRepository.find({ where: { email ,username} });
    if(founduser.length>0){
        return await this.usersRepository.update(email, {password:resetpassword}); 
    }
    else{ 
        throw new HttpException("Email or username incorrect",HttpStatus.BAD_REQUEST);
    }}

async checkbalance(email:string){
    const foundemail= await this.usersRepository.findOne({ where: { email } });
    const balance={
        accountbalance:foundemail.accountbalance 
    }
    return balance;
}

async credit(email:string,amount:number){
    const foundemail=await this.usersRepository.findOne({ where:{email}});
    const creditbal=foundemail.accountbalance+amount;
    return await this.usersRepository.update(email, {accountbalance:creditbal});
   
}
async payelectricity(email:string,ebill:number,pbill:number){
    const foundemail=await this.usersRepository.findOne({ where:{email}});
    if(foundemail.email.length>0 && foundemail.accountbalance>0){
        const bill=(+ebill)+(+pbill);
    let paybill=Math.abs(foundemail.accountbalance)-Math.abs(bill);
    return "bill paid"
    }
    else
    throw new HttpException("negative balance please credit amount", HttpStatus.EXPECTATION_FAILED)    
}

async payphone(email:string,bill:number){
    const foundemail=await this.usersRepository.findOne({ where:{email}});
    if(foundemail.email.length>0 && foundemail.accountbalance>0){
        const paybill=foundemail.accountbalance-bill;
       return await this.usersRepository.update(email, {accountbalance:paybill});
    }
    else
    throw new HttpException("negative balance please credit amount", HttpStatus.EXPECTATION_FAILED)    

}
async payphoneandelectricity(email:string,pbill:number,ebill:number){
    const foundemail=await this.usersRepository.findOne({ where:{email}});
    if(foundemail.email.length>0 && foundemail.accountbalance>0){
        const paybill=foundemail.accountbalance-(pbill+ebill);
        return await this.usersRepository.update(email, {accountbalance:paybill});
    }
    else
    throw new HttpException("negative balance please credit amount", HttpStatus.EXPECTATION_FAILED)    
}
}
  