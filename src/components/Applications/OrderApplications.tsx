import {DetailValues} from "@/interfaces/Interfaces";
import {ReactNode} from "react";
import getApplicationStatuses from "@/api/getApplicationStatuses";
import {ApplicationDetails} from "@/interfaces/Types";
import getAllUsers from "@/api/GetAllUsers";
import AppliCard from "@/components/Applications/AppliCard";
//needs to take lecturer state too
type OrderApplicationsProps = {
    applicants: DetailValues[];
    courseCode?: string;
    sortFn: (a: ApplicationDetails, b: ApplicationDetails) => number;
};

export default function OrderApplications({
  applicants,
  courseCode,
  sortFn,
}: OrderApplicationsProps): ReactNode {
    const allUsers = getAllUsers()
    const allApps:Record<string, ApplicationDetails> = getApplicationStatuses()
    let wantedApps: [string, ApplicationDetails][] = Object.entries(allApps)
    //console.log("allApps (from OrderApplications)" , allApps)

    //Creates a Set of valid keys based on applicants + courseCode
    //not needed to filter allApps if view all true
    //an example of a key in allApps: alice.johnson@google.com_COSC4839
    if (courseCode) {
        const validKeys = new Set(
            applicants.map((applicant) => `${applicant.email}_${courseCode}`)
        );
        wantedApps = wantedApps.filter(([key]) => validKeys.has(key));
    }
    //console.log("validKeys (from OrderApplications)" , validKeys)
    console.log("wantedApps (from OrderApplications)" , wantedApps)
    const sortedEntries = wantedApps
        .sort(([, a], [, b]) => sortFn(a, b));
    //console.log("wantedApps (from OrderApplications)" , wantedApps)


    return (
        <>
            {sortedEntries.map(([key, app]) => (
                // <p key={key}>
                //     {key} | Rank: {app.Avg_Ranking} | Times Chosen: {app.Times_Chosen}
                // </p>
                <AppliCard
                    key={key}
                    application={app}
                    username={allUsers[key.split("_")[0]].User_Name}
                    // onSelect={selectApplicant(applicant, currentCourse)}
                />
            ))}
        </>
    );
}