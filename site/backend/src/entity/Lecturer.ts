import {
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Course } from "./Course";
import { Vote } from "./Vote";

@Entity()
export class Lecturer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Course, (course) => course.assigned_lecturers)
  @JoinTable()
  courses_assigned_to: Course[];

  @OneToMany((type) => Vote, (vote) => vote.lecturer, { cascade: ["remove"] })
  votes: Vote[];
}
