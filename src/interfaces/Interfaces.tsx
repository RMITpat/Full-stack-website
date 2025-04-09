import {Tutor} from "@/interfaces/Types";
export interface Course {
    name: string;
    courseCode: string;
    semester: string;
    applicants: Tutor[];
}
// for (Tutor tute : currentCourse.applicants) {
//      <appliCard>
// }
