import { Router } from "express";
import { CourseController } from "../controller/CourseController";
import { Course } from "../entity/Course";

const router = Router();
const courseController = new CourseController();

router.get("/course", async (req, res) => {
  await courseController.getAll(req, res);
});

router.get("/course/:code", async (req, res) => {
  await courseController.getOne(req, res);
});


export default router;

