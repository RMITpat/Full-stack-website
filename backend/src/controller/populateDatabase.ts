import { AppDataSource }  from "../data-source";
import { CourseController } from "./CourseController";
import { runPopulateCourse } from "./data/AddAllCourses";


export async function populate() {
  const courseController = new CourseController();

  //courses
  await runPopulateCourse(courseController);

  //

}
