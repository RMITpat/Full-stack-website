import { Router } from "express";
import { ApplicationController } from "../controller/ApplicationController"

const router = Router();
const applicantController = new ApplicationController();

router.get("/applications", async (req, res) => {
  await applicantController.all(req, res);
});

router.get("/applications/:id", async (req, res) => {
  await applicantController.one(req, res);
});



router.post("/applications", async (req, res) => {
  await applicantController.save(req, res);
});

router.put("/applications/:id", async (req, res) => {
  await applicantController.update(req, res);
});

router.delete("/applications/:id", async (req, res) => {
  await applicantController.remove(req, res);
});

export default router;
