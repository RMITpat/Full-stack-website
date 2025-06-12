import { Router } from "express";
import { LecturerController } from "../controller/LecturerController";
import { validateDto } from "../middlewares/validate";
import { LecturerSignUpDTO } from "../dtos/lecturer-signup.dto";

const router = Router();
const lecturerController = new LecturerController();

router.get("/lecturer", async (req, res) => {
  await lecturerController.all(req, res);
});

router.get("/lecturer/:id", async (req, res) => {
  await lecturerController.one(req, res);
});

router.post("/lecturer", validateDto(LecturerSignUpDTO), async (req, res) => {
  await lecturerController.save(req, res);
});

router.post("/lecturer/authenticate", async (req, res) => {
  await lecturerController.authenticate(req, res);
});

router.get("/lecturer/:id/allCourses", async (req, res) => {
  await lecturerController.allCourses(req, res);
});

router.put("/lecturer/:id", async (req, res) => {
  await lecturerController.update(req, res);
});

router.delete("/lecturer/:id", async (req, res) => {
  await lecturerController.remove(req, res);
});

export default router;
