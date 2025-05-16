import {
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { App_Credential } from "./App_Credential";
import { Course } from "./Course";
import { Application } from "./Application";


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

  @OneToMany(() => Application, (application) => application.applicant)
  applications: Application[]

  // @ManyToMany(() => Course)
  // @JoinTable()
  // courses_applied_to: Course

}
