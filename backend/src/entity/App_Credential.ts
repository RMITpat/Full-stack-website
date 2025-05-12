import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./User";

@Entity()
export class App_Credential {

  @PrimaryGeneratedColumn()
  app_ID: number;

  @Column()
  previous_roles: string;

  @Column()
  availability: string;

  @Column()
  skills: string;
  
  @Column()
  credentials: string;

  @OneToOne(() => User, (user) => user.cred)
  user: User;

  @CreateDateColumn()
  
  @UpdateDateColumn()
  updatedDate: Date
}
