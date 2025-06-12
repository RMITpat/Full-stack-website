import { Vote } from "../entity/Vote";
import { Request, Response, application } from "express";
import { AppDataSource } from "../data-source";
import { Lecturer } from "../entity/Lecturer";
import { Application } from "../entity/Application";

export class VoteController {
  private voteRepository = AppDataSource.getRepository(Vote);
  private lecturerRepository = AppDataSource.getRepository(Lecturer);
  private applicationRepository = AppDataSource.getRepository(Application);
  /* vote doesnt need a get because a lecturer would get their votes and an application would get their votes, we never have
to displays all votes for all applicants and lecturers */

  async all(request: Request, response: Response) {
    const votes = await this.voteRepository.find();

    return response.json(votes);
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
    const { ranking, lecturerId, applicationId, comment } = request.body;

    const foundLecturer = await this.lecturerRepository.findOneBy({
      id: lecturerId,
    });
    if (!foundLecturer) {
      response.json("Failed to find lecturer");
    }

    const foundApplication = await this.applicationRepository.findOneBy({
      id: applicationId,
    });
    if (!foundApplication) {
      response.json("Failed to find application");
    }

    const vote = Object.assign(new Vote(), {
      ranking,
      lecturer: foundLecturer,
      application: foundApplication,
      comment,
    });

      try {
          const savedVote = await this.voteRepository.save(vote);
          return response.status(201).json(savedVote);
      } catch (error) {
          return response
              .status(400)
              .json({ message: "Error creating vote", error });
      }
  }
    async getAverageRankings(request: Request, response: Response) {
    const courseId = parseInt(request.params.courseId);

    const averageRankings = await this.voteRepository
      .createQueryBuilder("vote")
      .innerJoin("vote.application", "application")
      .innerJoin("application.applicant", "applicant")
      .select("AVG(vote.ranking) AS avgRank")
      .addSelect("application")
      .addSelect("applicant")
      .where("application.courseId = :courseId", { courseId })
      .groupBy("vote.applicationId")
      .orderBy("avgRank", "ASC")
      .getRawMany();

    if (!averageRankings) {
      return response
        .status(404)
        .json({ message: "Error fetching average rankings" });
    }
    const object = averageRankings.map((applicant) => ({
      avgRank: applicant.avgRank,
      application: {
        id: applicant.application_id,
        type: applicant.application_type,
        previousRoles: applicant.application_previousRoles,
        availability: applicant.application_availability,
        skills: applicant.application_skills,
        credentials: applicant.application_credentials,
        courseId: applicant.application_courseId,
        applicant: {
          id: applicant.applicant_id,
          firstName: applicant.applicant_firstName,
          lastName: applicant.applicant_lastName,
          email: applicant.applicant_email,
          blocked: applicant.applicant_blocked,
          createdAt: applicant.applicant_createdAt,
          updatedAt: applicant.applicant_updatedAt,
        },
      },
    }));
    return response.json(object);
  }
  async getLecturerVotes(request: Request, response: Response) {
    const { lecturerId } = request.params;

    const lecturerVotes = await this.voteRepository.find({
      where: {
        lecturer: { id: parseInt(lecturerId) },
      },
      relations: ["application"],
      order: {
        ranking: "ASC",
      },
    });
    if (!lecturerVotes) {
      return response.json("Failed to find any lecturer votes");
    }

    return response.json(lecturerVotes);
  }
  async getByApplication(request: Request, response: Response) {
    const { appId } = request.params;

    const foundVotes = await this.voteRepository.find({
      where: { application: { id: parseInt(appId) } },
    });

    if (!foundVotes) {
      return response.json("Failed to find votes for application");
    }

    return response.json(foundVotes);
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
    const { id, appId } = request.params;
    const voteToRemove = await this.voteRepository.findOne({
      where: {
        lecturer: { id: parseInt(id) },
        application: { id: parseInt(appId) },
      },
    });

    if (!voteToRemove) {
      return response.status(404).json({ message: "Vote not found" });
    }

    await this.voteRepository.remove(voteToRemove);
    return response.json({ message: "Vote removed successfully" });
  }
}
