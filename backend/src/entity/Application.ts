import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vote } from "./Vote";
import { Applicant } from "./Applicant";
import { Course } from "./Course";

export enum ApplicationType {
  LAB_ASSISTANT = "Lab Assistant",
  TUTOR = "Tutor",
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: ApplicationType,
    default: ApplicationType.TUTOR,
  })
  type: ApplicationType;

  @Column()
  previousRoles: string;

  @Column()
  availability: string;

  @Column()
  skills: string;

  @Column()
  credentials: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.applications)
  applicant: Applicant;

  @ManyToOne(() => Course, (course) => course.applications)
  course: Course;

  // an application has many different lectures
  // who make 1 vote on each on an application
  @OneToMany(() => Vote, (vote) => (vote.voteId, vote.lecturer))
  votes: Vote[];
}
