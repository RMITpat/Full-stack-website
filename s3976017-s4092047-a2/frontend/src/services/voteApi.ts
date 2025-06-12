import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const voteApi = {
  getVotes: async () => {
    const response = await api.get("/votes");
    return response.data;
  },
  getVoteByApplication: async (appId: number) => {
    const response = await api.get(`/votes/application/${appId}`);
    return response.data;
  },

  getLecturerVotes: async (lecturerId: number) => {
    const response = await api.get(`/votes/lecturer/${lecturerId}`);
    return response.data;
  },

  getAverageRankings: async (courseId: number) => {
    const response = await api.get(`/votes/averageRankings/${courseId}`);
    return response.data;
  },

  createVote: async (values: {
    ranking: number;
    lecturerId: number;
    applicationId: number;
    comment: string;
  }) => {
    const response = await api.post("/votes", values);
    return response.data;
  },

  deleteVote: async (lecturerId: number, appId: number) => {
    const response = await api.delete(
      `/votes/lecturer/${lecturerId}/application/${appId}`
    );
    return response.data;
  },
};
