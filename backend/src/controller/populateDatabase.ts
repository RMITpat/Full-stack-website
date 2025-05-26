import { AppDataSource }  from "../data-source";
import { ApplicantController } from "./ApplicantController";
import { CourseController } from "./CourseController";
import { LecturerController } from "./LecturerController";
import { runPopulateApplicants } from "./data/AddAllApplicants";
import { runPopulateCourse } from "./data/AddAllCourses";
import { runPopulateLecturers } from "./data/AddAllLecturers";


export async function populate() {
  const courseController = new CourseController();
  const applicantController = new ApplicantController();
  const lecturerController = new LecturerController();
  //courses
  await runPopulateCourse(courseController);
  //applicants
  await runPopulateApplicants(applicantController)
  //
  await runPopulateLecturers(lecturerController)

}
