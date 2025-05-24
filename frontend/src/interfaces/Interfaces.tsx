import { User } from "./Types";

export enum ApplicationType {
  LAB_ASSISTANT = "Lab Assistant",
  TUTOR = "tutor",
}

export interface DetailValues {
  email: string;
  name: string;
  lecturerComments: Record<string, string>[];

  previousRoles: string;
  availability: string;
  skills: string;
  credentials: string;
}

export interface AppAndComment {
  applicant: DetailValues;
  comment: string;
}
export interface IndCourse {
  name: string;
  courseCode: string;
  semester: string;
  applicants: DetailValues[];
  lecturerRankings: Record<string, AppAndComment[]>;
}
export interface Application {
  applicant: User;
  type: ApplicationType;
  previousRoles: string;
  availability: string;
  skills: string;
  credentials: string;
  course: Course;
}
export interface Applicant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  applications: Application[];
  createdAt: Date;
  updatedAt: Date;
}
export interface Vote {}
export interface Course {
  name: string;
  courseCode: string;
  semester: string;
  applicants: DetailValues[];
  assigned_lecturers: Lecturer[];
}
export interface Lecturer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  votes: Vote[];
  courses_assigned_to: Course[];
  createdAt: Date;
  updatedAt: Date;
}
