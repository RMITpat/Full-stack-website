/*  ██████╗ ██████╗ ██████╗ ██╗███████╗██████╗                                */
/* ██╔════╝██╔═══██╗██╔══██╗██║██╔════╝██╔══██╗                               */
/* ██║     ██║   ██║██████╔╝██║█████╗  ██║  ██║                               */
/* ██║     ██║   ██║██╔═══╝ ██║██╔══╝  ██║  ██║                               */
/* ╚██████╗╚██████╔╝██║     ██║███████╗██████╔╝                               */
/*  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═════╝                                */
/*                                                                            */
/* ███████╗██████╗  ██████╗ ███╗   ███╗    ██╗    ██╗███████╗███████╗██╗  ██╗ */
/* ██╔════╝██╔══██╗██╔═══██╗████╗ ████║    ██║    ██║██╔════╝██╔════╝██║ ██╔╝ */
/* █████╗  ██████╔╝██║   ██║██╔████╔██║    ██║ █╗ ██║█████╗  █████╗  █████╔╝  */
/* ██╔══╝  ██╔══██╗██║   ██║██║╚██╔╝██║    ██║███╗██║██╔══╝  ██╔══╝  ██╔═██╗  */
/* ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║    ╚███╔███╔╝███████╗███████╗██║  ██╗ */
/* ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝     ╚══╝╚══╝ ╚══════╝╚══════╝╚═╝  ╚═╝ */
/*                                                                            */
/*  █████╗     ██╗      █████╗ ██████╗ ███████╗                               */
/* ██╔══██╗    ██║     ██╔══██╗██╔══██╗██╔════╝                               */
/* ╚█████╔╝    ██║     ███████║██████╔╝███████╗                               */
/* ██╔══██╗    ██║     ██╔══██║██╔══██╗╚════██║                               */
/* ╚█████╔╝    ███████╗██║  ██║██████╔╝███████║                               */
/*  ╚════╝     ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝                               */

import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Applicant } from "../entity/Applicant";
import { DataSource } from "typeorm";
import bcrypt from "bcrypt";

export class ApplicantController {
  private applicantRepository = AppDataSource.getRepository(Applicant);

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
    const applicants = await this.applicantRepository.find();

    return response.json(applicants);
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
    const applicant = await this.applicantRepository.findOne({
      where: { id },
    });

    if (!applicant) {
      return response.status(404).json({ message: "Applicant not found" });
    }
    return response.json(applicant);
  }

  /*                           */
  /*        authenticate       */
  /*             :D            */
  /**
   * Finds user in the repository that matches email and password
   * @param request - Express request object containing applicant details in body
   * @param response - Express response object
   * @returns JSON response containing the created applicant or error message
   */
    async authenticate(request: Request, response: Response) {
      const { email, password } = request.body;

      const applicant = await this.applicantRepository.findOne({
        where: { email: email },
      });

      if (!applicant) {
        return response.status(404).json({ message: "Email or password is incorrect" });
      }

      const passwordMatches = await bcrypt.compare(password, applicant.password);

      if (!passwordMatches) {
        return response.status(404).json({ message: "Email or password is incorrect" });
      }

      if (applicant.blocked) {
        return response.status(403).json({ message: "Applicant blocked from signing in" });
      }
      return response.json(applicant);
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
  const { firstName, lastName, email, applications, password } = request.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salt!!

    const applicant = Object.assign(new Applicant(), {
      firstName,
      lastName,
      email,
      applications,
      password: hashedPassword,
    });

    const savedApplicant = await this.applicantRepository.save(applicant);
    return response.status(201).json(savedApplicant);
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
    const applicantToRemove = await this.applicantRepository.findOne({
      where: { id },
    });

    if (!applicantToRemove) {
      return response.status(404).json({ message: "Applicant not found" });
    }

    await this.applicantRepository.remove(applicantToRemove);
    return response.json({ message: "Applicant removed successfully" });
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
    const { firstName, lastName, email, applications, password } = request.body;

    let applicantToUpdate = await this.applicantRepository.findOne({
      where: { id },
    });

    if (!applicantToUpdate) {
      return response.status(404).json({ message: "Applicant not found" });
    }
    const updates: Partial<Applicant> = {};
    if (firstName !== undefined) updates.firstName = firstName;
    if (lastName !== undefined) updates.lastName = lastName;
    if (email !== undefined) updates.email = email;
    if (password !== undefined) updates.password = password;

    if (applications !== undefined) updates.applications = applications;

    Object.assign(applicantToUpdate, updates);

    try {
      const updatedApplicant = await this.applicantRepository.save(
        applicantToUpdate
      );
      return response.json(updatedApplicant);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error updating applicant", error });
    }
  }

  
}
