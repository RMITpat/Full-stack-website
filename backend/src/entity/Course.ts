import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Applicant } from "./Applicant";
import { Lecturer } from "./Lecturer";

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
  applied_users: Applicant[];

  @ManyToMany(() => Lecturer, (lecturer) => lecturer.course_assigned_to)
  assigned_lecturers: Lecturer[];
  }

