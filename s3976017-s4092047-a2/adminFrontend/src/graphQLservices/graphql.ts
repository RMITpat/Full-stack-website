import { gql } from "@apollo/client";

export const GET_ADMIN = gql`
  query GetAdmin($username: String!, $password: String!) {
    admin(username: $username, password: $password) {
      id
      username
      password
    }
  }
`;

export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      name
      code
      semester
    }
  }
`;

export const GET_APPLICANTS_NOT_CHOSEN = gql`
  query GetApplicantsNotChosen {
    applicantsNotChosen {
      id
      firstName
      lastName
      timesVoted
    }
  }
`;

export const GET_APPLICANT_MORE_THAN_3_COURSES = gql`
  query GetApplicantsMoreThan3 {
    applicantsChosenMoreThan3Courses {
      id
      firstName
      lastName
      email
      numCoursesVotedFor
    }
  }
`;

export const GET_APPLICANTS_WITH_VOTES = gql`
  query GetApplicantsWithVotes(
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
`;

export const GET_APPLICANTS = gql`
  query GetApplicants {
    applicants {
      id
      firstName
      lastName
      blocked
      email
      password
      createdAt
      updatedAt
    }
  }
`;
export const CANDIDATES_CHOSEN = gql`
  query CandidatesChosenForCourse($courseId: ID) {
    applicantsChosenForCourse(courseId: $courseId) {
      id
      firstName
      lastName
      email
    }
  }
`;
export const GET_COURSE = gql`
  query GetCourse($code: String!) {
    course(code: $code) {
      id
      name
      code
      semester
      assigned_lecturers {
        id
        firstName
        lastName
        email
        password
        createdAt
        updatedAt
        votes {
          ranking
          comment
          application {
            course {
              id
            }
            type
            applicant {
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;

export const LECTURERS_NOT_IN_COURSE = gql`
  query LecturersNotInCourse($courseId: ID) {
    lecturersNotInCourse(courseId: $courseId) {
      id
      firstName
      lastName
      email
    }
  }
`;
export const CREATE_COURSE = gql`
  mutation CreateCourse($name: String!, $code: String!, $semester: String!) {
    createCourse(name: $name, code: $code, semester: $semester)
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: ID!
    $code: String!
    $name: String!
    $semester: String!
  ) {
    updateCourse(id: $id, code: $code, name: $name, semester: $semester)
  }
`;
export const REMOVE_LECTURER_FROM_COURSE = gql`
  mutation RemoveLecturerFromCourse($courseId: ID!, $lecturerId: ID!) {
    removeLecturerFromCourse(courseId: $courseId, lecturerId: $lecturerId) {
      code
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation DeleteCourse($courseId: ID!) {
    deleteCourse(courseId: $courseId)
  }
`;

export const TOGGLE_BLOCK = gql`
  mutation ToggleBlock($applicantId: ID!) {
    toggleBlock(applicantId: $applicantId)
  }
`;

export const ADD_LECTURER_TO_COURSE = gql`
  mutation AddLecturerToCourse($courseId: ID!, $lecturerId: ID!) {
    addLecturerToCourse(courseId: $courseId, lecturerId: $lecturerId)
  }
`;
