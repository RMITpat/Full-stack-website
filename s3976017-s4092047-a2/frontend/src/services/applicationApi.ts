import axios from "axios";
import { Application } from "@/interfaces/Interfaces";
export const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const applicationApi = {
  getAllApplications: async () => {
    const response = await api.get("/applications");
    return response.data;
  },

  getCourseApplications: async (code: string) => {
    console.log(code);
    const response = await api.get(`/applications/byCourse/${code}`);
    return response.data;
  },

  getApplicationById: async (id: number) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },
  getTimesChosenForCourse: async (courseId: number) => {
    const response = await api.get(`/applications/timesChosen/${courseId}`);
    return response.data;
  },
  createApplication: async (application: Application) => {
    const response = await api.post("/applications", application);
    return response.data;
  },
  
  getComments: async (applicationId:number, courseId: number) => {
    const response = await api.get(`/applications/${applicationId}/comments/${courseId}`)
    return response.data;
  },

  updateApplication: async (id: number, application: Partial<Application>) => {
    const response = await api.put(`/applications/${id}`, application);
    return response.data;
  },

  deleteApplication: async (id: number) => {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
  },
};
