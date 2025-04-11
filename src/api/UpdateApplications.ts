import {ApplicationDetails, ApplicationDetailsWithEmail} from "@/interfaces/Types";
import {IndCourse} from "@/interfaces/Interfaces";
import ApplicantToAppStat from "@/api/ApplicantToAppStat";
import getApplicationStatuses from "@/api/getApplicationStatuses";

function courseApplicantsToAppStats(course: IndCourse)
    : ApplicationDetailsWithEmail[]{
    const allDetails: ApplicationDetailsWithEmail[] = []
    for (const applicant of course.applicants){
        const applicationDetails: ApplicationDetailsWithEmail = ApplicantToAppStat(applicant)
        allDetails.push(applicationDetails)
    }
    return allDetails
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
        {... prevApps} //this is what adds newAppStats to prevApps
    );
}

export default function updateApplication(course: IndCourse) {
    const prevAppStats: Record<string, ApplicationDetails> = getApplicationStatuses()
    const newAppStats: ApplicationDetailsWithEmail[] = courseApplicantsToAppStats(course)
    const mergedApps: Record<string, ApplicationDetails>
        = mergeAllApps(
        prevAppStats, newAppStats, course
    )
    localStorage.setItem("ApplicationStatuses", JSON.stringify(mergedApps))
}