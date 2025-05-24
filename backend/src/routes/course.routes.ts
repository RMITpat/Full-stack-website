import { Router } from "express";
import { CourseController } from "../controller/CourseController";
import { Course } from "../entity/Course";

const router = Router();
const courseController = new CourseController();

router.get("/course/get-all", async (req, res) => {
  await courseController.getAll(req, res);
});

export default router;

