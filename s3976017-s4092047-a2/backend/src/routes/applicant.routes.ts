import { Router } from "express";
import { ApplicantController } from "../controller/ApplicantController";
import { validateDto } from "../middlewares/validate";
import { ApplicantSignUpDTO } from "../dtos/applicant-signup.dto";
const router = Router();
const applicantController = new ApplicantController();

router.get("/applicants", async (req, res) => {
  await applicantController.all(req, res);
});

router.get("/applicants/:id", async (req, res) => {
  await applicantController.one(req, res);
});

router.post("/applicants/authenticate", async (req, res) => {
  await applicantController.authenticate(req, res);
});

router.post(
  "/applicants",
  validateDto(ApplicantSignUpDTO),
  async (req, res) => {
    await applicantController.save(req, res);
  }
);

router.put("/applicants/:id", async (req, res) => {
  await applicantController.update(req, res);
});

router.delete("/applicants/:id", async (req, res) => {
  await applicantController.remove(req, res);
});

export default router;
