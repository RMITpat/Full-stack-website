import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Lecturer } from "./Lecturer";

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
}
