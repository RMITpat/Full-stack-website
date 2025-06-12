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
  PrimaryGeneratedColumn,
} from "typeorm";
import { Applicant } from "./Applicant";
import { Lecturer } from "./Lecturer";
import { Application } from "./Application";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  semester: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Application, (application) => application.course, {
    cascade: ["remove"],
  })
  applications: Application[];
  // @ManyToMany(() => Applicant, (app) => app.courses_applied_to)
  // applied_users: Applicant[];

  @ManyToMany(() => Lecturer, (lecturer) => lecturer.courses_assigned_to)
  assigned_lecturers: Lecturer[];
}
