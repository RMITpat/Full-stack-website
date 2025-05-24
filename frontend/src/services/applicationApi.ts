import axios from "axios";
import { Application } from "@/interfaces/Interfaces";
export const api = axios.create({
  baseURL: "http://localhost:3001/api", // Adjust this to match your backend URL
});



export const applicationApi = {
  getAllApplications: async () => {
    const response = await api.get("/applications");
    return response.data;
  },

  getApplicationById: async (id: number) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },


  createApplication: async (application: Application) => {
    const response = await api.post("/applications", application);
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
