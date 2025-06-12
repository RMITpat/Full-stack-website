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
  //find all votes for an application, find the average of all their rankings
  @PrimaryGeneratedColumn()
  id: number;

  // @PrimaryColumn()
  // votedOnId: number;

  @Column()
  ranking: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  comment: string;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.votes)
  lecturer: Lecturer;

  @ManyToOne(() => Application, (app) => app.votes, {
    eager: true,
    onDelete: "CASCADE",
  })
  application: Application;
}
