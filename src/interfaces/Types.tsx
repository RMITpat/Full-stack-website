export type Tutor = {
  email: string;
  name: string;
};

export type Application = {
  course: string;
  name: string;
  previousRoles: string;
  availability: string;
  skills: string;
  credentials: string;
};

export type ApplicationMap = {
  [key: string]: Application;
};
