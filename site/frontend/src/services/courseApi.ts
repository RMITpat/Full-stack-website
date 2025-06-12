import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const courseApi = {
  getCourseById: async (code: string) => {
    const response = await api.get(`/course/${code}`);
    return response.data;
  },

  getCourses: async () => {
    const response = await api.get("/course");
    return response.data;
  },
};
