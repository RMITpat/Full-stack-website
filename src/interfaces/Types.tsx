export type User = {
  User_Name: string;
  User_Email: string;
  User_Type:
      "default" |
      "logged_in" |
      "logged_in_lecturer" |
      "admin_default" |
      "admin_logged_in" |
      "admin_lecturer";
  User_Password: string;
  User_Img_Url: string;
}
export type UserCredential = {
  previousRoles: string;
  availability: string;
  skills: string;
  credentials: string;
};

export type ApplicationMap = {
  [key: string]: UserCredential;
};

export type ApplicationParents = {
  Users_Credential: UserCredential;
  Votes: LectureVote[];
};

export type ApplicationDetails = ApplicationParents & {
  Avg_Ranking: number;
  Times_Chosen: number;
};

export type LectureVote = {
    Lecturer: User;
    ranking: number;
    Chosen: boolean;

  }
