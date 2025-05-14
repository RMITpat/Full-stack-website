import { AppDataSource }  from "../data-source";
import { CourseController } from "./CourseController";

async function populate() {
  await AppDataSource.initialize();

  const courseController = new CourseController();
  const addAllResult = courseController.addAll()
  


}
