export type User = {
    User_Name: string;
    User_Email: string;
    User_Type: "default" | "tutor" | "lecturer" | "admin";
    User_Img_Url: string;
  }