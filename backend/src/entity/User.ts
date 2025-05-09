import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { App_Credential } from "./App_Credential";

export enum user_type {
   LOGGEDOUT        = "default", 
   LOGGEDIN         = "logged_in", 
   LOGGEDINLECTURER = "logged_in_lecturer", 
   ADMINDEFAULT     = "admin_default", 
   ADMINLOGGEDIN    = "admin_logged_in", 
   ADMINLECTURER    = "admin_lecturer"

}


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: "enum",
    enum: user_type,
    default: user_type.LOGGEDOUT,
  })
  type: user_type;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date

  @OneToOne(() => App_Credential)
  @JoinColumn()
  cred: App_Credential;
}
