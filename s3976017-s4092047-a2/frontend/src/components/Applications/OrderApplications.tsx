import { SimpleGrid } from "@mantine/core";
import AppliCard from "@/components/Applications/AppliCard";
import { RawApplication } from "@/interfaces/Types";

type OrderApplicationsProps = {
  applications: RawApplication[];
};

export default function OrderApplications({
  applications,
}: OrderApplicationsProps) {
  if (applications.length === 0) return <p>No results</p>;

  return (
    <SimpleGrid cols={4}>
      {applications.map((app) => (
        <AppliCard
          key={app.id}
          application={{
            Avg_Ranking: app.averageRanking ?? null,
            Times_Chosen: app.timesChosen,
            Users_Credential: {
              availability: app.availability,
              skills: app.skills,
              credentials: app.credentials,
              previousRoles: app.previousRoles,
            },
            Votes: [],
          }}
          username={`${app.applicant.firstName} ${app.applicant.lastName}`}
          courseCode={app.course.code}
          courseName={app.course.name}
        />
      ))}
    </SimpleGrid>
  );
}
