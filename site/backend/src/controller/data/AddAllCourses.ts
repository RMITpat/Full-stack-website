import { CourseController } from "../CourseController";
import { Request, Response } from "express";
import { courseData } from "./courseData";

export type Course = {
  name: string;
  code: string;
  semester: string;
}

const manualRequest = (body: Course[]): Partial<Request> => ({
  body,
});


const mockResponse = (): Partial<Response> => {
  const res: any = {};
  res.status = (code: number) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data: any) => {
    res.data = data;
    return res;
  };
  return res;
};

//next add same but for applicants

export async function runPopulateCourse(controller: CourseController) {
  const req = manualRequest(courseData) as Request
  const res = mockResponse() as Response;

  await controller.addAll(req, res);

  console.log("Course Insert Status:", (res as any).statusCode);
  console.log("Course Insert Response:", (res as any).data);
}

