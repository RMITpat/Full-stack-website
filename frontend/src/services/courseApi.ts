import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3001/api", // Adjust this to match your backend URL
});

export const courseApi = {
  getCourseById: async (code: string) => {
    const response = await api.get(`/course/${code}`);
    return response.data;
  },
};
