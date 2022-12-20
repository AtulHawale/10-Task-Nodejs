import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { isNumber } from 'util';

@Entity()
export class User {


  @PrimaryColumn()
  email: string;
 
  @Column()
  username: string;


  @Column()
  password: string;

  
  @Column({default: 5000})
  accountbalance:number;
}