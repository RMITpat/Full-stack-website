import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Vote {
  @PrimaryColumn()
  voterId: number;

  @PrimaryColumn()
  voteedOnId: number;

  @ManyToOne(() => User, (user) => user.votesGiven { eager: true })
  @JoinColumn({ name: "voterId" })
  voter: User;

  @ManyToOne(() => User, (user) => user.votesReceived, { eager: true })
  @JoinColumn({ name: "voteedOnId" })
  voteed_on: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
