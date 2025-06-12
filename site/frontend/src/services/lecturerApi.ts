import axios from "axios";
import { Lecturer } from "@/interfaces/Interfaces";
export const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const lecturerApi = {
  getAllLecturers: async () => {
    const response = await api.get("/lecturer");
    return response.data;
  },

  getLecturerById: async (id: number) => {
    const response = await api.get(`/lecturer/${id}`);
    return response.data;
  },

  createLecturer: async (lecturer: Partial<Lecturer>) => {
    const response = await api.post("/lecturer", lecturer);
    return response.data;
  },

  updateLecturer: async (id: number, lecturer: Partial<Lecturer>) => {
    const response = await api.put(`/lecturer/${id}`, lecturer);
    return response.data;
  },

  logInLecturer: async (values: { email: string; password: string }) => {
    const response = await api.post("/lecturer/authenticate", values);
    return response.data;
  },

  allCourses: async (id: number) => {
    const response = await api.get(`/lecturer/${id}/allCourses`);
    return response.data;
  },

  deleteLecturer: async (id: number) => {
    const response = await api.delete(`/lecturer/${id}`);
    return response.data;
  },
};
