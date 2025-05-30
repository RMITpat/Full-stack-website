import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Applicant } from "./Applicant";
import { Lecturer } from "./Lecturer";
import { Application } from "./Application";

@Entity()
export class Course {
  @PrimaryColumn()
  code: string; 

  @Column()
  semester: string; 

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Application, (application) => application.course)
  applications: Application[];
  // @ManyToMany(() => Applicant, (app) => app.courses_applied_to)
  // applied_users: Applicant[];

  @ManyToMany(() => Lecturer, (lecturer) => lecturer.courses_assigned_to)
  assigned_lecturers: Lecturer[];
  }

