import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";
import { IndCourse } from "../interfaces/Interfaces";

export class CourseController {
  private courseRepository = AppDataSource.getRepository(Course);
  
/* ┌─┐┌─┐┌┬┐  ┌─┐┬  ┬   */
/* │ ┬├┤  │   ├─┤│  │   */
/* └─┘└─┘ ┴   ┴ ┴┴─┘┴─┘ */
   /** get all
   * Retrieves all courses from the database
   * @param request - Express request object
   * @param response - Express response object
   * @returns JSON response containing an array of all courses
   */
  async getAll(request: Request, response: Response) {
    const courses = await this.courseRepository.find();

    return response.json(courses);
  }
  


/* ┌─┐┌─┐┌┬┐  ┌─┐┌┐┌┌─┐ */
/* │ ┬├┤  │   │ ││││├┤  */
/* └─┘└─┘ ┴   └─┘┘└┘└─┘ */  
  /** get one
   * Retrieves a single course by their ID
   * @param request - Express request object containing the course ID in params
   * @param response - Express response object
   * @returns JSON response containing the course if found, or 404 error if not found
   */
  async getOne(request: Request, response: Response) {
    const code = request.params.code;
    const course = await this.courseRepository.findOne({
      where: { code },
    });

    if (!course) {
      return response.status(404).json({ message: "course not found" });
    }
    return response.json(course);
  }

  async addAll(req: Request, res: Response) {
    const 
  }
}
