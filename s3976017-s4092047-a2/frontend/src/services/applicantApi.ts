import axios from "axios";
import { Applicant } from "@/interfaces/Interfaces";
export const api = axios.create({
  baseURL: "http://localhost:4000/api", 
});

export const applicantApi = {
  getAllApplicants: async () => {
    const response = await api.get("/applicants");
    return response.data;
  },

  getApplicantById: async (id: number) => {
    const response = await api.get(`/applicants/${id}`);
    return response.data;
  },

  logInApplicant: async (values: { email: string; password: string }) => {
    const response = await api.post("/applicants/authenticate", values);
    return response.data;
  },

  createApplicant: async (applicant: Partial<Applicant>) => {
    const response = await api.post("/applicants", applicant);
    return response.data;
  },

  updateApplicant: async (id: number, applicant: Partial<Applicant>) => {
    const response = await api.put(`/applicants/${id}`, applicant);
    return response.data;
  },

  deleteApplicant: async (id: number) => {
    const response = await api.delete(`/applicants/${id}`);
    return response.data;
  },
};
