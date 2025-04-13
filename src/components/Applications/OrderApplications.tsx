import {DetailValues} from "@/interfaces/Interfaces";
import {ReactNode} from "react";
import getApplicationStatuses from "@/api/getApplicationStatuses";
import {ApplicationDetails} from "@/interfaces/Types";
import getAllUsers from "@/api/GetAllUsers";
import AppliCard from "@/components/Applications/AppliCard";
import {Flex, SimpleGrid} from "@mantine/core";
//needs to take lecturer state too
type OrderApplicationsProps = {
    courseCode?: string[];
    sortFn: (a: ApplicationDetails, b: ApplicationDetails) => number;
    searchTerm?: string;
    availability?: string;
    chosen?: boolean;
};

export default function OrderApplications({
  courseCode,
  sortFn,
  searchTerm,
  availability,
  chosen,
}: OrderApplicationsProps): ReactNode {
  const allUsers = getAllUsers();
  const allApps: Record<string, ApplicationDetails> = getApplicationStatuses();

    let wantedApps = Object.entries(allApps);

    // Filter by courseCode
    if (courseCode && courseCode.length > 0) {
        const validKeys = new Set(
            Object.keys(allApps).filter(key =>
                courseCode.some(code => key.endsWith(`_${code}`))
            )
        );
        wantedApps = wantedApps.filter(([key]) => validKeys.has(key));
    }

  // Apply filters
  wantedApps = wantedApps.filter(([key, app]) => {
    const userMatchesSearch =
      !searchTerm ||
      app.Users_Credential.skills
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      app.Users_Credential.previousRoles
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        app.Users_Credential.availability
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
        app.Times_Chosen.toString()
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
        app.Avg_Ranking.toString()
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
      key.toLowerCase().includes(searchTerm.toLowerCase())

    const availabilityMatches =
      !availability || app.Users_Credential.availability === availability;

    const chosenMatches =
      chosen === undefined || app.Times_Chosen > 0 === chosen;

    return userMatchesSearch && availabilityMatches && chosenMatches;
  });

  const sortedApps = wantedApps.sort(([, a], [, b]) => sortFn(a, b));

    return (
        <div>
            {sortedApps.length === 0 ? (
                <p>No results</p>
            ) : (
                <SimpleGrid cols={4}>
                {sortedApps.map(([key, app]) => (
                    <AppliCard
                        key={key}
                        application={app}
                        username={allUsers[key.split("_")[0]]?.User_Name ?? "Unknown User"}
                    />
                ))}
                </SimpleGrid>

            )}
        </div>

    );
}
