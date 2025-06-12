export type User = {
  User_id: number;
  User_FirstName: string;
  User_LastName: string;
  User_Email: string;
  User_Type:
    | "default"
    | "logged_in"
    | "logged_in_lecturer"
    | "admin_default"
    | "admin_logged_in"
    | "admin_lecturer";
  User_Password: string;
  User_Applications: [];
  User_Courses_Assigned_To: [];
  User_Votes: [];
  User_Date_Joined: Date;
  User_Updated_At: Date;
  User_blocked: boolean;
};

export type UserCredential = {
  previousRoles: string;
  availability: string;
  skills: string;
  credentials: string;
};

export type ApplicationMap = {
  [key: string]: UserCredential;
};
export type LecturerVote = {
  Lecturer_Email: string;
  ranking: number;
  Chosen: boolean;
};
//this is abstract, don't use it directly, use
//ApplicationDetails instead
export type ApplicationParents = {
  Users_Credential: UserCredential;
  Votes: LecturerVote[];
};
//a new application should have a user and a blank array of votes
//it gets these from ApplicationParents
//to set Avg_Ranking and Times_Chosen use
// the computeApplication.ts in /src/api/
export type ApplicationDetails = ApplicationParents & {
  Avg_Ranking: number;
  Times_Chosen: number;
};
//this is for the new graphql query

export type RawApplication = {
  id: string;
  type: string;
  availability: string;
  skills: string;
  credentials: string;
  previousRoles: string;
  averageRanking: number;
  timesChosen: number;
  applicant: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  course: {
    code: string;
    name: string;
  };
};
export type RawApplicationResponse = {
  applications: RawApplication[];
};

export type ApplicationDetailsWithEmail = ApplicationDetails & {
  User_Email: string;
};
