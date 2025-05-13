import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Applicant } from "../entity/Applicant";

export class ApplicantController {
  private applicantRepository = AppDataSource.getRepository(Applicant);

  /**
   * Retrieves all applicants from the database
   * @param request - Express request object
   * @param response - Express response object
   * @returns JSON response containing an array of all applicants
   */
  async all(request: Request, response: Response) {
    const applicants = await this.applicantRepository.find();

    return response.json(applicants);
  }

  /**
   * Retrieves a single applicant by their ID
   * @param request - Express request object containing the applicant ID in params
   * @param response - Express response object
   * @returns JSON response containing the applicant if found, or 404 error if not found
   */
  async one(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const applicant = await this.applicantRepository.findOne({
      where: { id },
    });

    if (!applicant) {
      return response.status(404).json({ message: "Applicant not found" });
    }
    return response.json(applicant);
  }

  /**
   * Creates a new applicant in the database
   * @param request - Express request object containing applicant details in body
   * @param response - Express response object
   * @returns JSON response containing the created applicant or error message
   */
  async save(request: Request, response: Response) {
    const { firstName, lastName, email, age } = request.body;

    const applicant = Object.assign(new Applicant(), {
      firstName,
      lastName,
      email,
      age,
    });

    try {
      const savedApplicant = await this.applicantRepository.save(applicant);
      return response.status(201).json(savedApplicant);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error creating applicant", error });
    }
  }

  /**
   * Deletes a applicant from the database by their ID
   * @param request - Express request object containing the applicant ID in params
   * @param response - Express response object
   * @returns JSON response with success message or 404 error if applicant not found
   */
  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const applicantToRemove = await this.applicantRepository.findOne({
      where: { id },
    });

    if (!applicantToRemove) {
      return response.status(404).json({ message: "Applicant not found" });
    }

    await this.applicantRepository.remove(applicantToRemove);
    return response.json({ message: "Applicant removed successfully" });
  }

  /**
   * Updates an existing applicant's information
   * @param request - Express request object containing applicant ID in params and updated details in body
   * @param response - Express response object
   * @returns JSON response containing the updated applicant or error message
   */
  async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { firstName, lastName, email, age } = request.body;

    let applicantToUpdate = await this.applicantRepository.findOne({
      where: { id },
    });

    if (!applicantToUpdate) {
      return response.status(404).json({ message: "Applicant not found" });
    }

    applicantToUpdate = Object.assign(applicantToUpdate, {
      firstName,
      lastName,
      email,
      age,
    });

    try {
      const updatedApplicant = await this.applicantRepository.save(applicantToUpdate);
      return response.json(updatedApplicant);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error updating applicant", error });
    }
  }
}
