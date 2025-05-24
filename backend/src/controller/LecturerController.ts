import { Lecturer } from "../entity/Lecturer";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { In } from "typeorm";
import { Course } from "../entity/Course";

export class LecturerController {
  private lecturerRepository = AppDataSource.getRepository(Lecturer);
  private courseRepository = AppDataSource.getRepository(Course);

  /* ┌─┐┌─┐┌┬┐  ┌─┐┬  ┬   */
  /* │ ┬├┤  │   ├─┤│  │   */
  /* └─┘└─┘ ┴   ┴ ┴┴─┘┴─┘ */
  /** get all
   * Retrieves all lecturers from the database
   * @param request - Express request object
   * @param response - Express response object
   * @returns JSON response containing an array of all lecturers
   */
  async all(request: Request, response: Response) {
    const lecturers = await this.lecturerRepository.find();

    return response.json(lecturers);
  }

  async allCourses(request: Request, response: Response) {
    const { id } = request.body;
    const foundLecturer = await this.lecturerRepository.findOne({
      where: { id },
      relations: ["courses_assigned_to"],
    });

    if (!foundLecturer) {
      return response.status(404).json({ message: "Lecturer not found" });
    }

    return response.json(foundLecturer.courses_assigned_to);
  }

  /* ┌─┐┌─┐┌┬┐  ┌─┐┌┐┌┌─┐ */
  /* │ ┬├┤  │   │ ││││├┤  */
  /* └─┘└─┘ ┴   └─┘┘└┘└─┘ */
  /** get one
   * Retrieves a single lecturer by their ID
   * @param request - Express request object containing the lecturer ID in params
   * @param response - Express response object
   * @returns JSON response containing the lecturer if found, or 404 error if not found
   */
  async one(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const lecturer = await this.lecturerRepository.findOne({
      where: { id },
    });

    if (!lecturer) {
      return response.status(404).json({ message: "Lecturer not found" });
    }
    return response.json(lecturer);
  }

  async authenticate(request: Request, response: Response) {
    const email = request.body.email;
    const password = request.body.password;
    const lecturer = await this.lecturerRepository.findOne({
      where: { email: email, password: password },
    });

    if (!lecturer) {
      return response.status(404).json({ message: "Lecturer not found" });
    }

    return response.json(lecturer);
  }

  /* ┌─┐┌─┐┬  ┬┌─┐  ┌─┐┌┐┌┌─┐ */
  /* └─┐├─┤└┐┌┘├┤   │ ││││├┤  */
  /* └─┘┴ ┴ └┘ └─┘  └─┘┘└┘└─┘ */
  /** save one
   * Creates a new lecturer in the database
   * @param request - Express request object containing lecturer details in body
   * @param response - Express response object
   * @returns JSON response containing the created lecturer or error message
   */

  async save(request: Request, response: Response) {
    const { firstName, lastName, email, courses_assigned_to, votes, password } =
      request.body;

    const courseRepo = AppDataSource.getRepository(Course);
    let assignedCourses: Course[] = [];

    if (Array.isArray(courses_assigned_to) && courses_assigned_to.length > 0) {
      assignedCourses = await courseRepo.findBy({
        code: In(courses_assigned_to),
      });
    }

    const lecturer = Object.assign(new Lecturer(), {
      firstName,
      lastName,
      email,
      courses_assigned_to: assignedCourses,
      votes,
      password,
    });

    try {
      const savedLecturer = await this.lecturerRepository.save(lecturer);
      return response.status(201).json(savedLecturer);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error creating lecturer", error });
    }
  }

  /* ┌┬┐┌─┐┬  ┌─┐┌┬┐┌─┐  ┌─┐┌┐┌┌─┐ */
  /*  ││├┤ │  ├┤  │ ├┤   │ ││││├┤  */
  /* ─┴┘└─┘┴─┘└─┘ ┴ └─┘  └─┘┘└┘└─┘ */
  /** delete one
   * Deletes a lecturer from the database by their ID
   * @param request - Express request object containing the lecturer ID in params
   * @param response - Express response object
   * @returns JSON response with success message or 404 error if lecturer not found
   */
  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const lecturerToRemove = await this.lecturerRepository.findOne({
      where: { id },
    });

    if (!lecturerToRemove) {
      return response.status(404).json({ message: "Lecturer not found" });
    }

    await this.lecturerRepository.remove(lecturerToRemove);
    return response.json({ message: "Lecturer removed successfully" });
  }

  /* ┬ ┬┌─┐┌┬┐┌─┐┌┬┐┌─┐  ┌─┐┌┐┌┌─┐ */
  /* │ │├─┘ ││├─┤ │ ├┤   │ ││││├┤  */
  /* └─┘┴  ─┴┘┴ ┴ ┴ └─┘  └─┘┘└┘└─┘ */
  /** update one
   * Updates an existing lecturer's information
   * @param request - Express request object containing lecturer ID in params and updated details in body
   * @param response - Express response object
   * @returns JSON response containing the updated lecturer or error message
   */
  async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { firstName, lastName, email, courses_assigned_to, votes, password } =
      request.body;

    let lecturerToUpdate = await this.lecturerRepository.findOne({
      where: { id },
      relations: ["courses_assigned_to"],
    });

    if (!lecturerToUpdate) {
      return response.status(404).json({ message: "Lecturer not found" });
    }

    // Prepare updates
    const updates: Partial<Lecturer> = {};
    if (firstName !== undefined) updates.firstName = firstName;
    if (lastName !== undefined) updates.lastName = lastName;
    if (email !== undefined) updates.email = email;
    if (votes !== undefined) updates.votes = votes;
    if (password !== undefined) updates.password = password;

    // get the course's in the req body from the db
    if (courses_assigned_to !== undefined) {
      const courseRepo = AppDataSource.getRepository(Course);
      const courseEntities = await courseRepo.findBy({
        code: In(courses_assigned_to),
      });
      updates.courses_assigned_to = courseEntities;
    }

    Object.assign(lecturerToUpdate, updates);

    try {
      const updatedLecturer = await this.lecturerRepository.save(
        lecturerToUpdate
      );
      return response.json(updatedLecturer);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error updating lecturer", error });
    }
  }
}
