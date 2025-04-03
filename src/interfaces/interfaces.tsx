export interface DetailValues {
  name: string;
  previousRoles: string;
  availability: string;
  skills: string;
  credentials: string;
}

export interface Course {
  name: string;
  courseCode: string;
  semester: string
  applicants: DetailValues[]
}