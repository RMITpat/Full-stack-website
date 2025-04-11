import {DetailValues} from "@/interfaces/Interfaces";
import {ReactNode} from "react";
import getApplicationStatuses from "@/api/getApplicationStatuses";
import {ApplicationDetails} from "@/interfaces/Types";
import getAllUsers from "@/api/GetAllUsers";
import AppliCard from "@/components/Applications/AppliCard";

type OrderApplicationsProps = {
    viewAll: boolean;
    applicants: DetailValues[];
    courseCode: string;
    sortFn: (a: ApplicationDetails, b: ApplicationDetails) => number;
};

export default function OrderApplications({
  viewAll,
  applicants,
  courseCode,
  sortFn,
}: OrderApplicationsProps): ReactNode {
    const allUsers = getAllUsers()
    const allApps:Record<string, ApplicationDetails> = getApplicationStatuses()
    //console.log("allApps (from OrderApplications)" , allApps)
    // Create a Set of valid keys based on applicants + courseCode
    // an example of a key in allApps: alice.johnson@google.com_COSC4839
    if (!viewAll) {
        const validKeys = new Set(
            applicants.map((applicant) => `${applicant.email}_${courseCode}`)
        );
    } else {
        const validKeys = new Set(
            applicants.map((applicant) => applicant.email)
        );
    //console.log("validKeys (from OrderApplications)" , validKeys)

    const filteredEntries =
        Object.entries(allApps).filter(([key]) =>
            validKeys.has(key)
    );
    //console.log("filteredEntries (from OrderApplications)" , filteredEntries)
    const sortedEntries = filteredEntries
        .sort(([, a], [, b]) => sortFn(a, b));

    //console.log("sortedEntries (from OrderApplications)" , sortedEntries)
    // next make a card that renders these nicely
    //
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
                />
            ))}
        </>
    );
}