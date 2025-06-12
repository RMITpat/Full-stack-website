import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Loader, Text } from "@mantine/core";
import { Chip, Group, SegmentedControl, Grid } from "@mantine/core";
import OrderApplications from "@/components/Applications/OrderApplications";
import { RawApplication } from "@/interfaces/Types";
import SearchBar from "@/components/Applications/SearchBar";
import { useEffect } from "react";
import { Course } from "@/interfaces/Interfaces";
import { toast } from "react-toastify";

const GET_FILTERED_APPLICATIONS = gql`
  query GetFilteredApplications(
    $searchTerm: String
    $availability: String
    $courseCodes: [String!]
    $order: OrderEnum
  ) {
    applications(
      searchTerm: $searchTerm
      availability: $availability
      courseCodes: $courseCodes
      order: $order
    ) {
      id
      type
      availability
      skills
      credentials
      previousRoles
      timesChosen
      applicant {
        id
        firstName
        lastName
        email
      }
      course {
        code
        name
      }
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

//the front end should be able to handle changes in how the availability is stored
function normalizeAvailabilityInput(input: string): string {
  return input.toLowerCase().replace(/[\s_-]/g, "");
}

export default function FilterApplications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [availability, setAvailability] = useState<string | null>(null);
  const [courseFilter, setCourseFilter] = useState<string[]>([]);
  const [order, setOrder] = useState<"Ascending" | "Descending">("Ascending");
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
                query GetCourses {
                  courses {
                    id
                    name
                    code
                    semester
                  }
                }
              `,
          }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error("GraphQL query failed");
        }

        setCourses(result.data.courses);
      } catch {
        toast.error("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, []);

  const { data, loading, error } = useQuery(GET_FILTERED_APPLICATIONS, {
    variables: {
      searchTerm,
      availability: availability
        ? normalizeAvailabilityInput(availability)
        : undefined,
      courseCodes: courseFilter,
      order,
    },
    fetchPolicy: "no-cache",
  });
  const handleChipClick = (value: string) => {
    setAvailability((prev) => (prev === value ? null : value));
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div>
        <Text>Error loading applications</Text>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  const applications: RawApplication[] = data.applications ?? [];

  return (
    <div>
      <Grid align="center">
        <Grid.Col span={2}>
          <SearchBar onSearch={(term) => setSearchTerm(term)} />
        </Grid.Col>

        <Grid.Col span={2}>
          <Chip.Group
            value={availability}
            onChange={(val) => setAvailability(val as string)}
          >
            <Group>
              <Chip
                value="Full-Time"
                onClick={() => handleChipClick("Full-Time")}
              >
                Full-Time
              </Chip>
              <Chip
                value="Part-Time"
                onClick={() => handleChipClick("Part-Time")}
              >
                Part-Time
              </Chip>
            </Group>
          </Chip.Group>
        </Grid.Col>

        <Grid.Col span={2}>
          <SegmentedControl
            value={order}
            onChange={(val) => setOrder(val as "Ascending" | "Descending")}
            data={[
              { label: "Ascending", value: "Ascending" },
              { label: "Descending", value: "Descending" },
            ]}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <Chip.Group multiple value={courseFilter} onChange={setCourseFilter}>
            <Group>
              {courses.map((course) => (
                <Chip key={course.id} value={course.code}>
                  {course.code}
                </Chip>
              ))}
            </Group>
          </Chip.Group>
        </Grid.Col>
      </Grid>

      <OrderApplications applications={applications} />
    </div>
  );
}
