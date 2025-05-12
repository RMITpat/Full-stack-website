import {
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { App_Credential } from "./App_Credential";
import { Course } from "./Course";


@Entity()
export class Applicant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => Course)
  @JoinTable()
  courses_applied_to: Course

}
