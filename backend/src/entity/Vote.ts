import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  OneToMany, 
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lecturer } from "./Lecturer";
import { Application } from "./Application";
@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  voteId: number;

  // @PrimaryColumn()
  // votedOnId: number;

  @Column()
  ranking: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.votes)
  lecturer: Lecturer
  
  @ManyToOne(() => Application, (app) => app.votes)
  application: Application; 
}
