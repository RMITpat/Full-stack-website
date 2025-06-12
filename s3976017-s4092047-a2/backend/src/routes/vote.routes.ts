import { Router } from "express";
import { VoteController } from "../controller/VoteController"
import { Vote } from "src/entity/Vote";
import { LecturerVoteDTO } from "../dtos/lecturer-vote.dto"; 
import { validateDto } from "../middlewares/validate"; 

const router = Router();
const voteController = new VoteController();


router.post("/votes", validateDto(LecturerVoteDTO), async (req, res) => {
  await voteController.save(req, res);
});

router.get("/votes/lecturer/:lecturerId", async (req, res) => {
  await voteController.getLecturerVotes(req, res);
});
router.get("/votes", async (req, res) => {
  await voteController.all(req, res);
});

router.get("/votes/application/:appId", async (req, res) => {
  await voteController.getByApplication(req, res);
});
router.delete("/votes/lecturer/:id/application/:appId", async (req, res) => {
  await voteController.remove(req, res);
});

router.get("/votes/averageRankings/:courseId", async (req, res) => {
  await voteController.getAverageRankings(req, res)
});

export default router;
