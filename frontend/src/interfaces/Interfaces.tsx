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
    applicant: DetailValues
    comment: string
}
export interface IndCourse {
  name: string;
  courseCode: string;
  semester: string;
  applicants: DetailValues[];
  lecturerRankings: Record<string, AppAndComment[]>;
}
export interface Application {
  applicant: Applicant
  lecturerComments: Record<string, string>[];
  previousRoles: string;
  availability: string;
  skills: string;
  credentials: string;
}
export interface Applicant {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  applications: Application[]
}
export interface Vote {

}
export interface Course {
  assigned_lecturers: Lecturer[]
}
export interface Lecturer {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  votes: Vote[]
  courses_assigned_to: Course[]
}
