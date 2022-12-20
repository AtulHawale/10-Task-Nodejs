import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { userDTO } from 'src/users/dto/users.dto';
import { loginDTO } from 'src/users/dto/login.dto';
import { changepassDTO } from 'src/users/dto/changepass.dto';

@Injectable()
export class AuthService {
    constructor(public UsersService:UsersService,public JwtService:JwtService
){}

    async validateUser(username: string, pass: string): Promise<any> {
           const founduser= await this.UsersService.usercheck(username)
            if (!founduser) {
                throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
            }
            if (founduser && founduser.password === pass) {
                return founduser;
              }
              return null;
             }

     async generatetoken(login:loginDTO){
        const {username}=login;
        const payload= {username};
        const token=await this.JwtService.sign(payload);
        return {token:token}
  }
}
