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
  name: string;

  @Column()
  email: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => Course)
  @JoinTable()
  course_assigned_to: Course
  
  @OneToMany((type) => Vote, (vote) => vote.lecturer)
  votes: Vote[]
}
