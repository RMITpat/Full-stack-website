import {DetailValues} from "@/interfaces/Interfaces";
import {ApplicationDetailsWithEmail, ApplicationParents} from "@/interfaces/Types";
import computeApplication from "@/api/computeApplication";

export default function ApplicantToAppStat
(applicant: DetailValues): ApplicationDetailsWithEmail {

    const parents: ApplicationParents = {
        Users_Credential: {
            previousRoles: applicant.previousRoles,
            credentials: applicant.credentials,
            availability: applicant.availability,
            skills: applicant.skills,
        },
        Votes: [],
    }
    const { Avg_Ranking, Times_Chosen } = computeApplication(parents);

    const computedAndEmail: ApplicationDetailsWithEmail = {
        ...parents,
        Avg_Ranking,
        Times_Chosen,
        User_Email: applicant.email,
    };
    return computedAndEmail;
}