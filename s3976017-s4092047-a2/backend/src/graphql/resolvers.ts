import { AppDataSource } from "../data-source";
import { Admin } from "../entity/Admin";
import { GraphQLError } from "graphql";
import { Brackets } from "typeorm";
import { Course } from "../entity/Course";
import { Application } from "../entity/Application";
import { Lecturer } from "../entity/Lecturer";
import { Applicant } from "../entity/Applicant";
import { Vote } from "../entity/Vote";
const adminRepository = AppDataSource.getRepository(Admin);
const courseRepository = AppDataSource.getRepository(Course);
const applicationRepository = AppDataSource.getRepository(Application);

const voteRepository = AppDataSource.getRepository(Vote);

const lecturerRepository = AppDataSource.getRepository(Lecturer);
const applicantRepository = AppDataSource.getRepository(Applicant);

export const resolvers = {
  Query: {
    //this is for the all applicants page
    applications: async (
      _: any,
      {
        searchTerm,
        availability,
        courseCodes,
        order,
      }: {
        searchTerm?: string;
        availability?: string;
        courseCodes?: string[];
        order?:
          | "Ascending"
          | "Descending"
          | "TimesChosenAsc"
          | "TimesChosenDesc"
          | "RankingAsc"
          | "RankingDesc";
      }
    ) => {
      const query = applicationRepository
        .createQueryBuilder("application")
        .leftJoinAndSelect("application.applicant", "applicant")
        .leftJoinAndSelect("application.course", "course");

      if (searchTerm && searchTerm.trim() !== "") {
        const lowered = `%${searchTerm.toLowerCase()}%`;

        query.andWhere(
          new Brackets((qb) => {
            qb.where(
              "LOWER(CONCAT(applicant.firstName, ' ', applicant.lastName)) LIKE :searchTerm",
              { searchTerm: lowered }
            )
              .orWhere("LOWER(application.availability) LIKE :searchTerm", {
                searchTerm: lowered,
              })
              .orWhere("LOWER(application.credentials) LIKE :searchTerm", {
                searchTerm: lowered,
              })
              .orWhere("LOWER(application.previousRoles) LIKE :searchTerm", {
                searchTerm: lowered,
              })
              .orWhere("LOWER(application.skills) LIKE :searchTerm", {
                searchTerm: lowered,
              });
          })
        );
      }

      if (availability) {
        const normalizedAvailability = availability
          .toLowerCase()
          .replace(/[\s_]/g, "");

        query.andWhere(
          `REPLACE(REPLACE(LOWER(application.availability), '_', ''), ' ', '') = :normalizedAvailability`,
          { normalizedAvailability }
        );
      }

      if (courseCodes && courseCodes.length > 0) {
        query.andWhere("course.code IN (:...courseCodes)", { courseCodes });
      }

      // this is to prevent crash on avg ranking and times chosen being null in db
      switch (order) {
        case "RankingAsc":
          query.orderBy("IFNULL(application.averageRanking, 0)", "ASC");
          break;
        case "RankingDesc":
          query.orderBy("IFNULL(application.averageRanking, 0)", "DESC");
          break;
        case "TimesChosenAsc":
          query.orderBy("IFNULL(application.timesChosen, 0)", "ASC");
          break;
        case "TimesChosenDesc":
          query.orderBy("IFNULL(application.timesChosen, 0)", "DESC");
          break;
      }

      const apps = await query.getMany();

      return apps.map((app) => ({
        ...app,
        type: app.type?.toUpperCase(),
      }));
    },

    application: async (_: any, { id }: { id: number }) => {
      const app = await applicationRepository.findOne({
        where: { id },
        relations: ["applicant", "course"],
      });

      if (!app) throw new GraphQLError("Application not found");

      return {
        ...app,
        type: app.type?.toUpperCase(),
      };
    },

    courses: async () => {
      const courses = await courseRepository.find({});
      if (!courses) {
        throw new GraphQLError("Failed to find courses");
      }
      return courses;
    },
    applicantsChosenForCourse: async (
      _: any,
      { courseId }: { courseId: number }
    ) => {
      const applicantsChosen = await voteRepository
        .createQueryBuilder("vote")
        .innerJoin("vote.application", "application")
        .innerJoin("application.applicant", "applicant")
        .where("application.courseid = :courseId", { courseId: courseId })
        .select([
          "applicant.id AS id",
          "applicant.firstName AS firstName",
          "applicant.lastName AS lastName",
          "applicant.email AS email",
        ])
        .distinct(true)
        .getRawMany();

      if (!applicantsChosen) {
        throw new GraphQLError("Failed to find chosen candidates for course");
      }
      return applicantsChosen;
    },

    applicantsChosenMoreThan3Courses: async () => {
      /*
      SELECT 
      COUNT(DISTINCT application.courseId) AS numCoursesVotedFor, applicant.id, applicant.firstName, 
      applicant.lastName, applicant.email
      FROM `vote` 
      JOIN application ON vote.applicationId = application.id 
      JOIN applicant ON application.applicantId = applicant.id
      GROUP BY applicant.id, applicant.firstName, applicant.lastName, applicant.email
      HAVING numCoursesVotedFor > 3;
*/
      const applicants = await voteRepository
        .createQueryBuilder("vote")
        .innerJoin("vote.application", "application")
        .innerJoin("application.applicant", "applicant")
        .select("applicant.id", "id")
        .addSelect("applicant.firstName", "firstName")
        .addSelect("applicant.lastName", "lastName")
        .addSelect("applicant.email", "email")
        .addSelect("COUNT(DISTINCT application.courseId)", "numCoursesVotedFor")
        .groupBy("applicant.id")
        .addGroupBy("applicant.firstName")
        .addGroupBy("applicant.lastName")
        .addGroupBy("applicant.email")
        .having("COUNT(DISTINCT application.courseId) > :minCourses", {
          minCourses: 3,
        })
        .getRawMany();

      if (!applicants) {
        throw new GraphQLError(
          "Failed to get applicants with more than 3 courses voted for"
        );
      }
      return applicants;
    },

    applicantsNotChosen: async () => {
      /*
      SELECT count(vote.id) AS timesVoted, applicant.id, applicant.firstName, applicant.lastName, 
      applicant.email FROM `application` LEFT JOIN vote on application.id = vote.applicationId 
      JOIN applicant on application.applicantId = applicant.id
      GROUP BY applicant.id
      HAVING timesVoted = 0;
      */
      const applicants = await applicationRepository
        .createQueryBuilder("application")
        .leftJoin("vote", "vote", "vote.applicationId = application.id")
        .innerJoin("application.applicant", "applicant")
        .select("applicant.id", "id")
        .addSelect("applicant.firstName", "firstName")
        .addSelect("applicant.lastName", "lastName")
        .addSelect("COUNT(vote.id)", "timesVoted")
        .groupBy("applicant.id")
        .having("timesVoted = :none", { none: 0 })
        .getRawMany();

      console.log(applicants);
      if (!applicants) {
        throw new GraphQLError("Failed to get applicants not chosen");
      }
      return applicants;
    },

    // not used for candidates page
    applicantsWithVotes: async (
      _: any,
      {
        minVotes = 0,
        maxVotes = Number.MAX_SAFE_INTEGER,
        minRanking = 1.0,
        maxRanking = 5.0,
        courseCodes = [],
      }: {
        minVotes?: number;
        maxVotes?: number;
        minRanking?: number;
        maxRanking?: number;
        courseCodes?: string[];
      }
    ) => {
      const qb = voteRepository
        .createQueryBuilder("vote")
        .innerJoin("vote.application", "application")
        .innerJoin("application.applicant", "applicant")
        .innerJoin("application.course", "course")
        .select([
          "applicant.id AS id",
          "applicant.firstName AS firstName",
          "applicant.lastName AS lastName",
          "applicant.email AS email",
          "applicant.password AS password",
          "applicant.blocked AS blocked",
          "applicant.createdAt AS createdAt",
          "applicant.updatedAt AS updatedAt",
          "AVG(vote.ranking) AS averageRanking",
          "COUNT(vote.id) AS voteCount",
        ])
        .groupBy("applicant.id")
        .addGroupBy("applicant.firstName")
        .addGroupBy("applicant.lastName")
        .addGroupBy("applicant.email")
        .addGroupBy("applicant.password")
        .addGroupBy("applicant.blocked")
        .addGroupBy("applicant.createdAt")
        .addGroupBy("applicant.updatedAt")
        .having("COUNT(vote.id) >= :minVotes", { minVotes })
        .andHaving("COUNT(vote.id) <= :maxVotes", { maxVotes })
        .andHaving("AVG(vote.ranking) >= :minRanking", { minRanking })
        .andHaving("AVG(vote.ranking) <= :maxRanking", { maxRanking });

      if (courseCodes.length > 0) {
        qb.andWhere("course.code IN (:...courseCodes)", { courseCodes });
      }
      const raw = await qb.getRawMany();

      return raw.map((row) => ({
        id: Number(row.id),
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        password: row.password,
        blocked: row.blocked,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        averageRanking: parseFloat(row.averageRanking),
        voteCount: parseInt(row.voteCount),
      }));
    },

    applicants: async () => {
      const applicants = await applicantRepository.find();
      if (!applicants) {
        throw new GraphQLError("Failed to find applicants");
      }
      return applicants;
    },

    course: async (_: any, { code }: { code: string }) => {
      const course = await courseRepository.findOne({
        where: { code: code },
        relations: [
          "assigned_lecturers",
          "assigned_lecturers.votes",
          "assigned_lecturers.votes.application",
          "assigned_lecturers.votes.application.applicant",
        ],
      });
      if (!course) {
        throw new GraphQLError("Failed to find course");
      }
      return course;
    },

    admin: async (
      _: any,
      { username, password }: { username: string; password: string }
    ) => {
      const admin = await adminRepository.findOne({
        where: { username: username, password: password },
      });
      if (!admin) {
        throw new GraphQLError("Username or password is incorrect");
      }
      return admin;
    },
    lecturersNotInCourse: async (
      _: any,
      { courseId }: { courseId: number }
    ) => {
      const course = await courseRepository.findOne({
        where: { id: courseId },
        relations: ["assigned_lecturers"],
      });
      if (!course) {
        throw new GraphQLError("Failed to find course");
      }
      const lecturers = await lecturerRepository.find();

      const assignedIds = new Set(course.assigned_lecturers.map((a) => a.id));
      const filteredLecturers: typeof lecturers = lecturers.filter(
        (lecturer) => !assignedIds.has(lecturer.id)
      );

      return filteredLecturers;
    },
  },

  Mutation: {
    removeLecturerFromCourse: async (
      _: any,
      { courseId, lecturerId }: { courseId: number; lecturerId: number }
    ) => {
      const course = await courseRepository.findOne({
        where: { id: courseId },
        relations: ["assigned_lecturers"],
      });
      if (!course) {
        throw new GraphQLError("Failed to find course");
      }

      course.assigned_lecturers = course.assigned_lecturers.filter(
        (lecturer) => Number(lecturer.id) !== Number(lecturerId)
      );
      return await courseRepository.save(course);
    },
    createCourse: async (
      _: any,
      {
        name,
        code,
        semester,
      }: {
        name: string;
        code: string;
        semester: string;
      }
    ) => {
      const course = courseRepository.create({
        name: name,
        code: code,
        semester: semester,
      });
      try {
        await courseRepository.insert(course);
        return true;
      } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY" || error.code === "1062") {
          throw new GraphQLError("Course code already taken");
        }
        throw new GraphQLError("Failed to create course");
      }
    },
    updateCourse: async (
      _: any,
      {
        id,
        code,
        name,
        semester,
      }: { id: number; code: string; name: string; semester: string }
    ) => {
      const updatedCourse = await courseRepository.update(id, {
        code,
        name,
        semester,
      });
      if (!updatedCourse) {
        throw new GraphQLError("Failed to update course");
      }
      return true;
    },
    addLecturerToCourse: async (
      _: any,
      { courseId, lecturerId }: { courseId: number; lecturerId: number }
    ) => {
      const course = await courseRepository.findOne({
        where: { id: courseId },
        relations: ["assigned_lecturers"],
      });
      const lecturer = await lecturerRepository.findOne({
        where: { id: lecturerId },
      });

      if (!course || !lecturer) {
        throw new GraphQLError("Course or lecturer not found");
      }

      course.assigned_lecturers = [...course.assigned_lecturers, lecturer];
      await courseRepository.save(course);
      return true;
    },
    deleteCourse: async (_: any, { courseId }: { courseId: number }) => {
      const courseToDelete = await courseRepository.findOne({
        where: { id: courseId },
        relations: ["assigned_lecturers"],
      });
      if (!courseToDelete) {
        throw new GraphQLError("Failed to find course to delete");
      }
      courseToDelete.assigned_lecturers = [];

      const result = await courseRepository.remove(courseToDelete);
      if (!result) {
        throw new GraphQLError("Failed to delete course)");
      }
      return true;
    },
    toggleBlock: async (_: any, { applicantId }: { applicantId: number }) => {
      const applicantToBlock = await applicantRepository.findOne({
        where: { id: applicantId },
      });
      if (!applicantToBlock) {
        throw new GraphQLError("Failed to find applicant to block");
      }

      applicantToBlock.blocked = !applicantToBlock.blocked;
      await applicantRepository.save(applicantToBlock);
      return true;
    },
  },
};
