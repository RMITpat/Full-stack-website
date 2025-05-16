import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Application } from "../entity/Application";

export class ApplicationController {
  private applicationRepository = AppDataSource.getRepository(Application);

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
    const applications = await this.applicationRepository.find();

    return response.json(applications);
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
    const application = await this.applicationRepository.findOne({
      where: { id },
    });

    if (!application) {
      return response.status(404).json({ message: "Application not found" });
    }
    return response.json(application);
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
    const {
      type,
      previous_roles,
      availability,
      skills,
      credentials,
      applicant,
      course,
      votes,
    } = request.body;

    const application = Object.assign(new Application(), {
      type,
      previous_roles,
      availability,
      skills,
      credentials,
      applicant,
      course,
      votes,
    });
    try {
      const savedApplication = await this.applicationRepository.save(
        application
      );
      return response.status(201).json(savedApplication);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error creating applicant", error });
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
    const applicationToRemove = await this.applicationRepository.findOne({
      where: { id },
    });

    if (!applicationToRemove) {
      return response.status(404).json({ message: "Application not found" });
    }

    await this.applicationRepository.remove(applicationToRemove);
    return response.json({ message: "Application removed successfully" });
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
    const { type,
      previous_roles,
      availability,
      skills,
      credentials,
      applicant,
      course,
      votes, } = request.body;

    let applicationToUpdate = await this.applicationRepository.findOne({
      where: { id },
    });

    if (!applicationToUpdate) {
      return response.status(404).json({ message: "Application not found" });
    }

    const updates: Partial<Application> = {};
    if (type !== undefined) updates.type = type;
    if (previous_roles !== undefined) updates.previous_roles = previous_roles;
    if (skills !== undefined) updates.skills = skills;
    if (credentials !== undefined) updates.credentials = credentials;
    if (applicant !== undefined) updates.applicant = applicant;
    if (course !== undefined) updates.course = course;
    if (votes !== undefined) updates.votes = votes;

    Object.assign(applicationToUpdate, updates);
    
    try {
      const updatedApplicant = await this.applicationRepository.save(
        applicationToUpdate
      );
      return response.json(updatedApplicant);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error updating application", error });
    }
  }
}
