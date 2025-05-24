import { Lecturer } from "../entity/Lecturer";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { In } from "typeorm"; 
import { Course } from "../entity/Course";

export class LecturerController {
  private lecturerRepository = AppDataSource.getRepository(Lecturer);

  /* ┌─┐┌─┐┌┬┐  ┌─┐┬  ┬   */
  /* │ ┬├┤  │   ├─┤│  │   */
  /* └─┘└─┘ ┴   ┴ ┴┴─┘┴─┘ */
  /** get all
   * Retrieves all applicants from the database
   * @param request - Express request object
   * @param response - Express response object
   * @returns JSON response containing an array of all applicants
   */
  async all(request: Request, response: Response) {
    const lecturers = await this.lecturerRepository.find();

    return response.json(lecturers);
  }

  /* ┌─┐┌─┐┌┬┐  ┌─┐┌┐┌┌─┐ */
  /* │ ┬├┤  │   │ ││││├┤  */
  /* └─┘└─┘ ┴   └─┘┘└┘└─┘ */
  /** get one
   * Retrieves a single applicant by their ID
   * @param request - Express request object containing the applicant ID in params
   * @param response - Express response object
   * @returns JSON response containing the applicant if found, or 404 error if not found
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
   * Creates a new applicant in the database
   * @param request - Express request object containing applicant details in body
   * @param response - Express response object
   * @returns JSON response containing the created applicant or error message
   */

  async save(request: Request, response: Response) {
    const { firstName, lastName, email, courses_assigned_to, votes, password } =
      request.body;

    const courseRepo = AppDataSource.getRepository(Course);
    const lecturerRepo = AppDataSource.getRepository(Lecturer);

    let assignedCourses: Course[] = [];

    if (Array.isArray(courses_assigned_to) && courses_assigned_to.length > 0) {
      assignedCourses = await courseRepo.findBy({
        code: In(courses_assigned_to),
      });
    }

    let lecturer = await lecturerRepo.findOne({
      where: { email },
      relations: ["courses_assigned_to"], // ensure we load the relation
    });

    if (lecturer) {
      // Update existing lecturer and reset courses
      lecturer.firstName = firstName;
      lecturer.lastName = lastName;
      lecturer.password = password;
      lecturer.votes = votes;
      lecturer.courses_assigned_to = assignedCourses;
    } else {
      // Create new
      lecturer = lecturerRepo.create({
        firstName,
        lastName,
        email,
        password,
        votes,
        courses_assigned_to: assignedCourses,
      });
    }

    try {
      const savedLecturer = await lecturerRepo.save(lecturer);
      return response.status(201).json(savedLecturer);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error saving lecturer", error });
    }
  }

  
  /* ┌┬┐┌─┐┬  ┌─┐┌┬┐┌─┐  ┌─┐┌┐┌┌─┐ */
  /*  ││├┤ │  ├┤  │ ├┤   │ ││││├┤  */
  /* ─┴┘└─┘┴─┘└─┘ ┴ └─┘  └─┘┘└┘└─┘ */
  /** delete one
   * Deletes a applicant from the database by their ID
   * @param request - Express request object containing the applicant ID in params
   * @param response - Express response object
   * @returns JSON response with success message or 404 error if applicant not found
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
   * Updates an existing applicant's information
   * @param request - Express request object containing applicant ID in params and updated details in body
   * @param response - Express response object
   * @returns JSON response containing the updated applicant or error message
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
        const updatedLecturer = await this.lecturerRepository.save(lecturerToUpdate);
        return response.json(updatedLecturer);
      } catch (error) {
        return response
          .status(400)
          .json({ message: "Error updating lecturer", error });
      }
    }

}
