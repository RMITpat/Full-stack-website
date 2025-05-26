import axios from "axios";
import { Vote } from "@/interfaces/Interfaces";
export const api = axios.create({
  baseURL: "http://localhost:3001/api", // Adjust this to match your backend URL
});



export const voteApi = {


 

  getVoteByApplication: async (appId: number) => {
    const response = await api.get(`/votes/application/${appId}`);
    return response.data;
  },

  getLecturerVotes: async ( lecturerId: number) => {
    const response = await api.get(`/votes/lecturer/${lecturerId}`);
    return response.data
  },

  createVote: async (values: {ranking: number, lecturerId: number, applicationId: number, comment: string }) => {
    const response = await api.post("/votes", values);
    return response.data;
  },

  

  deleteVote: async (lecturerId: number, appId: number) => {
    const response = await api.delete(`/votes/lecturer/${lecturerId}/application/${appId}`);
    return response.data;
  },
};
