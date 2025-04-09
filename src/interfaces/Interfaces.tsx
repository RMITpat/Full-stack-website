import { ApplicationMap} from "@/interfaces/Types";
export interface Course {
    name: string;
    courseCode: string;
    semester: string;
    applicants: ApplicationMap;
}