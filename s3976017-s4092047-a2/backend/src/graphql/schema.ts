import gql from "graphql-tag";

export const typeDefs = gql`
  type Admin {
    id: ID!
    username: String!
    password: String!
  }

  enum ApplicationType {
    LAB_ASSISTANT
    TUTOR
  }
  enum OrderEnum {
    Ascending
    Descending
  }

  type Application {
    id: ID!
    applicant: Applicant
    type: String
    previousRoles: String
    availability: String
    skills: String
    credentials: String
    course: Course
    averageRanking: Float
    comments: [String]
    timesChosen: Int
  }
  type Applicant {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    applications: [Application]
    createdAt: String
    updatedAt: String
    blocked: Boolean
  }
  type ApplicantWithVotes {
    id: Int!
    firstName: String
    lastName: String
    email: String
    password: String
    blocked: Boolean
    createdAt: String
    updatedAt: String
    averageRanking: Float
    voteCount: Int
    courseCode: String
  }

  type Vote {
    id: ID!
    ranking: Int
    lecturerId: Int!
    application: Application
    comment: String
  }

  type Course {
    id: ID!
    name: String!
    code: String!
    semester: String!
    assigned_lecturers: [Lecturer]
  }

  type Lecturer {
    id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String
    votes: [Vote]
    courses_assigned_to: [Course]
    createdAt: String
    updatedAt: String
  }
  type ApplicantWithVoteCount {
    id: ID!
    firstName: String
    lastName: String
    email: String
    numCoursesVotedFor: Int!
}
type ApplicantsNotChosen {
    id: ID!
    firstName: String
    lastName: String
    email: String
    timesVoted: Int!
}
    type Query {
    admin(username: String, password: String): Admin
    courses: [Course]
    course(code: String!): Course!
    lecturersNotInCourse(courseId: ID): [Lecturer!]
    applicants: [Applicant]
    applicantsChosenMoreThan3Courses: [ApplicantWithVoteCount!]
    applicantsNotChosen: [ApplicantsNotChosen!]
    applicantsChosenForCourse(courseId: ID): [Applicant]
    applications(
      searchTerm: String
      availability: String
      courseCodes: [String!]
      order: OrderEnum
    ): [Application]

    application(id: ID!): Application
  }

type Query {
  applicantsWithVotes(
    minVotes: Int
    maxVotes: Int
    minRanking: Float
    maxRanking: Float
    courseCodes: [String!]
  ): [ApplicantWithVotes!]!
}
  
  type Mutation {
    updateCourse(
      id: ID!
      code: String!
      name: String!
      semester: String!
    ): Boolean!
    createCourse(name: String!, code: String!, semester: String!): Boolean!
    addLecturerToCourse(courseId: ID!, lecturerId: ID!): Boolean!
    removeLecturerFromCourse(courseId: ID!, lecturerId: ID!): Course!
    deleteCourse(courseId: ID!): Boolean!
    toggleBlock(applicantId: ID!): Boolean!

  }
`!;
