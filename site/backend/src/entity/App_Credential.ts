import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Applicant } from "./Applicant";

@Entity()
export class App_Credential {
  @PrimaryGeneratedColumn()
  app_ID: number;

  @Column()
  previousRoles: string;

  @Column()
  availability: string;

  @Column()
  skills: string;

  @Column()
  credentials: string;

  @OneToOne(() => Applicant, (app) => app.id)
  user: Applicant;

  @CreateDateColumn()
  @UpdateDateColumn()
  updatedDate: Date;
}
