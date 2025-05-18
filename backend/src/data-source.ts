import "reflect-metadata";
import { DataSource } from "typeorm";
import { Applicant } from "./entity/Applicant";
import { Application } from "./entity/Application";
import { Course } from "./entity/Course";
import { Lecturer } from "./entity/Lecturer";
import { Vote } from "./entity/Vote";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "209.38.26.237",
  port: 3306,
  username: "S4092047",
  password: "S4092047",
  database: "S4092047",
  // synchronize: true will automatically create database tables based on entity definitions
  // and update them when entity definitions change. This is useful during development
  // but should be disabled in production to prevent accidental data loss.
  synchronize: true,
  logging: true,
  entities: [Applicant, Application, Course, Lecturer, Vote],
  migrations: [],
  subscribers: [],
});


