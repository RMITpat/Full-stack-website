import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Application } from "../entity/Application";
import { Course } from "../entity/Course";
import { Applicant } from "../entity/Applicant";

export class ApplicationController {
  private applicationRepository = AppDataSource.getRepository(Application);
  private courseRepository = AppDataSource.getRepository(Course);
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
    const applications = await this.applicationRepository.find();

    return response.json(applications);
  }

  async allById(request: Request, response: Response) {
    const code = request.params.code;

    const courseRecord = await this.courseRepository.findOneBy({ code });

    if (!courseRecord) {
      return response.status(404).json({ message: "Course not found" });
    }

    const applications = await this.applicationRepository.find({
      where: {
        course: {
          id: courseRecord.id,
        },
      },
    });

    return response.json(applications);
  }

  async allWithVotes(request: Request, response: Response) {
    const dbres = await this.applicationRepository.query(
      "select * from application as a1 join vote as v1 on a1.id = v1.id"
    );
    if (!dbres) {
      return response.status(404).json({ message: "Applications not found" });
    }
    return response.json(dbres);
  }

  // async courseAll(request: Request, response: Response) {
  //   const id =
  // }
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
      id,
      type,
      previousRoles,
      availability,
      skills,
      credentials,
      applicant,
      course,
      votes,
    } = request.body;
    console.log(request.body);
    const courseCode = request.body.course?.code;
    console.log(courseCode);
    if (!courseCode) {
      return response
        .status(400)
        .json({ message: "Missing course code in request body" });
    }

    const courseRecord = await this.courseRepository.findOneBy({
      code: courseCode,
    });

    if (!courseRecord) {
      return response.status(404).json({ message: "Course not found" });
    }

    if (!courseRecord) {
      return response.status(404).json({ message: "CourseRecord not found" });
    }

    const applicantRecord = await this.applicantRepository.findOneBy({
      id: id,
    });

    if (!applicantRecord) {
      return response.status(404).json({ message: "Applicant not found" });
    }
    const application = Object.assign(new Application(), {
      type: type.toUpperCase(),
      previousRoles,
      availability,
      skills,
      credentials,
      applicant: applicantRecord,
      course: courseRecord,
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
        .json({ message: "Error creating application", error });
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
    const {
      type,
      previousRoles,
      availability,
      skills,
      credentials,
      applicant,
      course,
    } = request.body;

    let applicationToUpdate = await this.applicationRepository.findOne({
      where: { id },
    });

    if (!applicationToUpdate) {
      return response.status(404).json({ message: "Application not found" });
    }

    const updates: Partial<Application> = {};
    if (type !== undefined) updates.type = type;
    if (availability !== undefined) updates.availability = availability;

    if (previousRoles !== undefined) updates.previousRoles = previousRoles;
    if (skills !== undefined) updates.skills = skills;
    if (credentials !== undefined) updates.credentials = credentials;
    if (applicant !== undefined) updates.applicant = applicant;
    if (course !== undefined) updates.course = course;

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
  async getApplicationComments(request: Request, response: Response) {
    const applicationId = request.params.applicationId;
    const courseId = request.params.courseId;
    /*
    SELECT application.*, vote.comment 
    FROM `application`  
    JOIN vote ON vote.applicationId = application.id 
    WHERE application.id = 1 AND courseId = 1;
    */

    const comments = await this.applicationRepository
      .createQueryBuilder("application")
      .innerJoin("vote", "vote", "vote.applicationId = application.id")
      .select("vote.comment")
      .addSelect("vote.id")

      .where("application.id = :applicationId", { applicationId })
      .andWhere("application.courseId = :courseId", { courseId })
      .andWhere("vote.comment != :empty", { empty: "" })
      .getRawMany();

    if (!comments) {
      return response.status(404).json({ message: "Failed to get comments" });
    }
    return response.json(comments);
  }
  async timesChosenForCourse(request: Request, response: Response) {
    const courseId = parseInt(request.params.courseId);
    const applicantTimesChosen = await this.applicationRepository
      .createQueryBuilder("application")
      .leftJoin("vote", "vote", "vote.applicationId = application.id")
      .innerJoin("application.applicant", "applicant")
      .select("application.type", "type")
      .addSelect("COUNT(vote.id)", "timesChosen")
      .addSelect("applicant.firstName", "firstName")
      .addSelect("applicant.lastName", "lastName")
      .where("application.courseId = :courseId", { courseId })
      .groupBy("application.id")
      .orderBy("timesChosen", "ASC")
      .getRawMany();

    if (!applicantTimesChosen) {
      return response
        .status(404)
        .json({ message: "Failed to get times chosen" });
    }
    return response.json(applicantTimesChosen);
  }
}
