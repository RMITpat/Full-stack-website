import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Vote } from "./Vote";

export enum ApplicationType {
  LAB_ASSISTANT = "lab_assistant",
  TUTOR         = "tutor",
}

@Entity()
export class Application {

  @PrimaryColumn()
  id: number

  @Column({
    type: "enum",
    enum:ApplicationType ,
    default: ApplicationType.TUTOR,
  })
  type: ApplicationType 

  // an application has many different lectures 
  // who make 1 vote on each on an application
  @OneToMany(() => Vote, (vote) => (vote.voteedOnId, vote.lecturer))
  votes: Vote[]
}
