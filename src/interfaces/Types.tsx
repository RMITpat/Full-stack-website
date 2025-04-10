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

