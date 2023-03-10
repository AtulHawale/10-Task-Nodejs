import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { PaymentController } from './payment.controller';


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule,UsersModule,UsersService],
    providers:[UsersService],
    controllers:[UsersController,PaymentController]
})
export class UsersModule {}
