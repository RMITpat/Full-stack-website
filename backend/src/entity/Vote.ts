import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  OneToMany, 
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Lecturer } from "./Lecturer";
import { Application } from "./Application";
@Entity()
export class Vote {
  @PrimaryColumn()
  voterId: number;

  @PrimaryColumn()
  voteedOnId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => Lecturer, (lecturer) => lecturer.votes)
  lecturer: Vote

  @ManyToOne(() => Application, (app) => app.votes)
  application: Application; 
}
