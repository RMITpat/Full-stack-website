export interface Course {
    name: string;
    courseCode: string;
    semester: string;
    applicants: string[];
}
export interface DetailValues {
    email: string;
    name: string;
    previousRoles: string;
    availability: string;
    skills: string;
    credentials: string;
}
export interface IndCourse {
    name: string;
    courseCode: string;
    semester: string
    applicants: DetailValues[]
}
