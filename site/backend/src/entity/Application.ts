import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  Unique,
} from "typeorm";
import { Vote } from "./Vote";
import { Applicant } from "./Applicant";
import { Course } from "./Course";

export enum ApplicationType {
  LAB_ASSISTANT = "Lab Assistant",
  TUTOR = "Tutor",
}

@Entity()
@Unique(["applicant", "course", "type"])
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

  @ManyToOne(() => Applicant, (applicant) => applicant.applications, {
    eager: true,
  })
  applicant: Applicant;

  @ManyToOne(() => Course, (course) => course.applications, {
    eager: true,
    onDelete: "CASCADE",
  })
  course: Course;

  // an application has many different lectures
  // who make 1 vote on each on an application
  @OneToMany(() => Vote, (vote) => (vote.id, vote.lecturer), {
    cascade: ["remove"],
  })
  votes: Vote[];
}
