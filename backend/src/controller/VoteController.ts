import { Vote } from "src/entity/Vote"
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";

export class VoteController {
    private voteRepository = AppDataSource.getRepository(Vote);
  
/* vote doesnt need a get because a lecturer would get their votes and an application would get their votes, we never have
to displays all votes for all applicants and lecturers */

  
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
      const { ranking, lecturer, application  } = request.body;
  
      const vote = Object.assign(new Vote(), {
        ranking,
        lecturer,
        application
      });
  
      try {
        const savedVote = await this.voteRepository.save(lecturer);
        return response.status(201).json(savedVote);
      } catch (error) {
        return response
          .status(400)
          .json({ message: "Error creating vote", error });
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
      const voteId = parseInt(request.params.id);
      const voteToRemove = await this.voteRepository.findOne({
        where: { voteId },
      });
  
      if (!voteToRemove) {
        return response.status(404).json({ message: "Vote not found" });
      }
  
      await this.voteRepository.remove(voteToRemove);
      return response.json({ message: "Vote removed successfully" });
    }
  
  

   
  }