import { Router } from "express";
import { VoteController } from "../controller/VoteController"
import { Vote } from "src/entity/Vote";

const router = Router();
const voteController = new VoteController();


router.post("/votes", async (req, res) => {
  await voteController.save(req, res);
});

router.get("/votes/application/:appId", async (req, res) => {
  await voteController.getByApplication(req, res);
});
router.delete("/votes/lecturer/:id/application/:appId", async (req, res) => {
  await voteController.remove(req, res);
});

export default router;
