import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Applicant } from "./Applicant";

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
  
  @ManyToMany(() => Applicant, (app) => app.courses_applied_to)
  appliedUsers: Applicant[];

  }

