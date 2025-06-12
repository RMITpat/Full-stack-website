import { ApplicantController } from "../ApplicantController";
import { Request, Response } from "express";
import getSampleApplicants from "./applicantData"; // assume this returns Applicant[]

export type ApplicantInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const manualRequest = (body: ApplicantInput): Partial<Request> => ({
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

export async function runPopulateApplicants(controller: ApplicantController) {
  const applicants = getSampleApplicants(); // must return ApplicantInput[]

  for (const applicant of applicants) {
    const req = manualRequest(applicant) as Request;
    const res = mockResponse() as Response;

    await controller.save(req, res);

    console.log(
      `Applicant ${applicant.email} Insert Status:`,
      (res as any).statusCode
    );
    if ((res as any).statusCode !== 201) {
      console.error("Error:", (res as any).data);
    }
  }
}

