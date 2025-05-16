import { Router } from "express";
import { VoteController } from "../controller/VoteController"
import { Vote } from "src/entity/Vote";

const router = Router();
const voteController = new VoteController();


router.post("/vote", async (req, res) => {
  await voteController.save(req, res);
});


router.delete("/vote/:id", async (req, res) => {
  await voteController.remove(req, res);
});

export default router;
