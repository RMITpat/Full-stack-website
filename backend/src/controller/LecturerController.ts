import { Lecturer } from "src/entity/Lecturer";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";

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
      const { name, email, age, courses_assigned_to, votes } = request.body;
  
      const lecturer = Object.assign(new Lecturer(), {
        name,
        email,
        age,
        courses_assigned_to,
        votes
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
      const { name, email, courses_assigned_to, votes } = request.body;
  
      let lecturerToUpdate = await this.lecturerRepository.findOne({
        where: { id },
      });
  
      if (!lecturerToUpdate) {
        return response.status(404).json({ message: "Lecturer not found" });
      }
      
      //can update specific fields only now
      const updates: Partial<Lecturer> = {};
      if (name !== undefined) updates.name = name;
      if (email !== undefined) updates.email = email;
      if (courses_assigned_to !== undefined) updates.courses_assigned_to = courses_assigned_to;
      if (votes !== undefined) updates.votes = votes;

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