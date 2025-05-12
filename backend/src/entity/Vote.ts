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
import { Applicant } from "./Applicant";

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

  @OneToMany(() => Applicant, (applicant) => applicant.votes)
  applicants: Applicant[]  
}
