import { Router, application } from "express";
import { ApplicationController } from "../controller/ApplicationController"

const router = Router();
const applicationController = new ApplicationController();

router.get("/applications", async (req, res) => {
  await applicationController.all(req, res);
});

router.get("/applications/:id", async (req, res) => {
  await applicationController.one(req, res);
});

router.get("/applications/byCourse/:code", async (req, res) => {
  await applicationController.allById(req, res)
});

router.post("/applications", async (req, res) => {
  await applicationController.save(req, res);
});

router.put("/applications/:id", async (req, res) => {
  await applicationController.update(req, res);
});

router.delete("/applications/:id", async (req, res) => {
  await applicationController.remove(req, res);
});

export default router;
