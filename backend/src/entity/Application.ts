import {
  Entity,
  Column,
  PrimaryColumn
} from "typeorm";

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
}
