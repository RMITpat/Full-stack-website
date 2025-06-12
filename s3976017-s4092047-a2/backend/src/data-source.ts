import "reflect-metadata";
import { DataSource } from "typeorm";
import { Applicant } from "./entity/Applicant";
import { Application } from "./entity/Application";
import { Course } from "./entity/Course";
import { Lecturer } from "./entity/Lecturer";
import { Vote } from "./entity/Vote";
import { Admin } from "./entity/Admin";
import { config } from "dotenv";

//get the .env file in ./backend/
config();


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,  
  // synchronize: true will automatically create database tables based on entity definitions
  // and update them when entity definitions change. This is useful during development
  // but should be disabled in production to prevent accidental data loss.
  synchronize: true,
  logging: true,
  entities: [Applicant, Application, Course, Lecturer, Vote, Admin],
  migrations: [],
  subscribers: [],
});


