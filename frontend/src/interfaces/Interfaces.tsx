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
