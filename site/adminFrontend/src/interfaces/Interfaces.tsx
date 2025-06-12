export enum ApplicationType {
  LAB_ASSISTANT = "Lab Assistant",
  TUTOR = "tutor",
}

export interface Admin {
  id: number;
  username: string;
  password: string;
}
export interface Application {
  id: number;
  applicant: Applicant;
  type: ApplicationType;
  previousRoles: string;
  availability: string;
  skills: string;
  credentials: string;
  course: Course;
  averageRanking: number;
  comments: string[];
  timesChosen: number;
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
  blocked: boolean;
// these are for canditates page
  voteCount?: number;
  averageRanking?: number;
}
export interface Vote {
  id: number;
  ranking: number;
  createdAt: Date;
  updatedAt: Date;
  lecturerId: number;
  application: Application;
  comment: string;
}

export interface Course {
  id: number;
  name: string;
  code: string;
  semester: string;
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
