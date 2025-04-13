import {
  ApplicationDetails,
  ApplicationDetailsWithEmail,
  ApplicationParents,
  LecturerVote,
  UserCredential,
} from "@/interfaces/Types";
import { IndCourse } from "@/interfaces/Interfaces";
import ApplicantToAppStat from "@/api/ApplicantToAppStat";
import getApplicationStatuses from "@/api/getApplicationStatuses";
import computeApplication from "@/api/computeApplication";

function courseApplicantsToAppStats(
  course: IndCourse
): ApplicationDetailsWithEmail[] {
  const allDetails: ApplicationDetailsWithEmail[] = [];

  for (const applicant of course.applicants) {
    const votes: LecturerVote[] = [];

    for (const [lecturerEmail, rankingList] of Object.entries(
      course.lecturerRankings
    )) {

      const index = rankingList.findIndex(
        (a) => a.applicant.email === applicant.email
      );
      if (index !== -1) {
        votes.push({
          Lecturer_Email: lecturerEmail,
          ranking: index + 1,
          Chosen: index === 0, // true if first in ranking list
        });
      }
    }
    const parents: ApplicationParents = {
      Users_Credential: {
        previousRoles: applicant.previousRoles,
        availability: applicant.availability,
        skills: applicant.skills,
        credentials: applicant.credentials,
      },
      Votes: votes,
    };
    const appDetails: ApplicationDetails = computeApplication(parents);
    const appDetsEmail: ApplicationDetailsWithEmail = {
      User_Email: applicant.email,
      ...appDetails,
    };
    allDetails.push(appDetsEmail);
  }

  return allDetails;
}

function mergeAllApps(
  prevApps: Record<string, ApplicationDetails>,
  newAppStats: ApplicationDetailsWithEmail[],
  course: IndCourse
): Record<string, ApplicationDetails> {
  return newAppStats.reduce(
    (acc, application) => {
      //this determins the key in ApplicationStatuses
      const key = `${application.User_Email}_${course.courseCode}`;
      const { User_Email, ...appDetails } = application; //somehow this removes User_Email from appDetails
      acc[key] = appDetails;
      return acc;
    },
    { ...prevApps } //this is what adds newAppStats to prevApps
  );
}

export default function updateApplication(course: IndCourse) {
  const prevAppStats: Record<string, ApplicationDetails> =
    getApplicationStatuses();
  const newAppStats: ApplicationDetailsWithEmail[] =
    courseApplicantsToAppStats(course);
  const mergedApps: Record<string, ApplicationDetails> = mergeAllApps(
    prevAppStats,
    newAppStats,
    course
  );
  localStorage.setItem("ApplicationStatuses", JSON.stringify(mergedApps));
}
