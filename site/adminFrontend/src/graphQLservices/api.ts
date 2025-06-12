import { client } from "./apollo-client";
import {
  ADD_LECTURER_TO_COURSE,
  CANDIDATES_CHOSEN,
  CREATE_COURSE,
  DELETE_COURSE,
  GET_ADMIN,
  GET_APPLICANTS,
  GET_APPLICANTS_NOT_CHOSEN,
  GET_APPLICANTS_WITH_VOTES,
  GET_APPLICANT_MORE_THAN_3_COURSES,
  GET_COURSE,
  GET_COURSES,
  LECTURERS_NOT_IN_COURSE,
  REMOVE_LECTURER_FROM_COURSE,
  TOGGLE_BLOCK,
  UPDATE_COURSE,
} from "./graphql";
import { Applicant, Course, Lecturer } from "@/interfaces/Interfaces";
export const adminService = {
  getAdmin: async (username: string, password: string) => {
    const { data } = await client.query({
      query: GET_ADMIN,
      variables: { username: username, password: password },
      fetchPolicy: "no-cache",
    });
    return data;
  },

  getCourses: async (): Promise<Course[]> => {
    const { data } = await client.query({
      query: GET_COURSES,
      fetchPolicy: "no-cache",
    });
    return data.courses;
  },
  getApplicants: async (filterByVotes?: number): Promise<Applicant[]> => {
    const query =
      typeof filterByVotes === "number"
        ? GET_APPLICANTS_WITH_VOTES
        : GET_APPLICANTS;

    const { data } = await client.query({
      query,
      variables:
        typeof filterByVotes === "number" ? { minVotes: filterByVotes } : {},
      fetchPolicy: "no-cache",
    });

    return data.applicantsWithVotes ?? data.applicants;
  },

  getApplicantsByVoteStats: async (
    minVotes: number,
    maxVotes: number,
    minRanking: number,
    maxRanking: number,
    courseCodes: string[]
  ) => {
    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query ApplicantsWithVotes(
            $minVotes: Int
            $maxVotes: Int
            $minRanking: Float
            $maxRanking: Float
            $courseCodes: [String!]
          ) {
            applicantsWithVotes(
              minVotes: $minVotes
              maxVotes: $maxVotes
              minRanking: $minRanking
              maxRanking: $maxRanking
              courseCodes: $courseCodes
            ) {
              id
              firstName
              lastName
              email
              voteCount
              averageRanking
            }
          }
        `,
        variables: {
          minVotes,
          maxVotes,
          minRanking,
          maxRanking,
          courseCodes,
        },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error("Failed to fetch applicants");
    }

    return result.data.applicantsWithVotes;
  },
  getCourse: async (code: string): Promise<Course> => {
    const { data } = await client.query({
      query: GET_COURSE,
      variables: { code: code },
      fetchPolicy: "no-cache",
    });
    return data.course;
  },
  getApplicantsMoreThan3: async () => {
    const { data } = await client.query({
      query: GET_APPLICANT_MORE_THAN_3_COURSES,
      fetchPolicy: "no-cache",
    });
    return data.applicantsChosenMoreThan3Courses;
  },
  getApplicantsNotChosen: async () => {
    const { data } = await client.query({
      query: GET_APPLICANTS_NOT_CHOSEN,
      fetchPolicy: "no-cache",
    });
    return data.applicantsNotChosen;
  },

  getLecturersNotInCourse: async (courseId: number): Promise<Lecturer[]> => {
    const { data } = await client.query({
      query: LECTURERS_NOT_IN_COURSE,
      variables: { courseId: courseId },
      fetchPolicy: "no-cache",
    });
    return data.lecturersNotInCourse;
  },
  getCandidatesForCourse: async (courseId: number): Promise<Applicant[]> => {
    const { data } = await client.query({
      query: CANDIDATES_CHOSEN,
      variables: { courseId: courseId },
      fetchPolicy: "no-cache",
    });
    return data.applicantsChosenForCourse;
  },
  createCourse: async (name: string, code: string, semester: string) => {
    await client.mutate({
      mutation: CREATE_COURSE,
      variables: { name, code, semester },
    });
  },
  updateCourse: async (
    id: number,
    code: string,
    name: string,
    semester: string
  ) => {
    await client.mutate({
      mutation: UPDATE_COURSE,
      variables: { id, code, name, semester },
    });
  },

  removeLecturer: async (courseId: number, lecturerId: number) => {
    await client.mutate({
      mutation: REMOVE_LECTURER_FROM_COURSE,
      variables: { courseId, lecturerId },
    });
  },
  addLecturerToCourse: async (courseId: number, lecturerId: number) => {
    await client.mutate({
      mutation: ADD_LECTURER_TO_COURSE,
      variables: { courseId, lecturerId },
    });
  },
  deleteCourse: async (courseId: number): Promise<boolean> => {
    const { data } = await client.mutate({
      mutation: DELETE_COURSE,
      variables: { courseId },
    });
    return data;
  },
  toggleApplicantBlock: async (applicantId: number) => {
    await client.mutate({ mutation: TOGGLE_BLOCK, variables: { applicantId } });
  },
};
