import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Course {
  @PrimaryColumn()
  code: string; 

  @Column({ unique: true })
  semester: string; 

  @Column({ unique: true })
  name: string; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @OneToMany(() => User, (user) => user.appliedCourse)
  appliedUsers: User[];

  }

