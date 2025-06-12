import { useEffect, useState } from "react";

import { Button, Card, Group, SimpleGrid, Text, Title } from "@mantine/core";

import { lecturerApi } from "@/services/lecturerApi";
import { useLoginContext } from "@/contexts/LoginContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Course } from "@/interfaces/Interfaces";

/*
Validation of user inputs:

When creating a ranking, the applicants selected are added to the course's array of lecturer rankings
This selection is then grabbed and submitted to a course's total ranking computation when the Submit Ranking button is pressed.
Therefore, a lecturer cannot submit an empty ranking as in order to submit a ranking, they have to have first created one (by selecting applicants)

A lecturer cannot choose an applicant twice as each time the select button is pressed, the course's array of lecturer rankings is searched to see
if that applicant is already present. If it is, they are not added. This can be seen in the selectApplicant function below.

*/
export default function LecturerHomePage() {
  const currentUser = useLoginContext();
  const [assignedCourses, setAssignedCourses] = useState<Course[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const assignedCourses = await lecturerApi.allCourses(
          currentUser.user.User_id
        );

        setAssignedCourses(assignedCourses);
        console.log(assignedCourses);
      } catch {
        toast.error("Failed to fetch courses");
      }
    };
    fetchCourses();
  }, [currentUser.user.User_id]);

  const goToAllApplicants = () => {
    router.push("/ApplicantFilters");
  };

  return (
    <>
      <Text size="lg">Hi, {currentUser.user.User_FirstName}!</Text>

      <Group justify="space-between">
        <Title mb="sm">Courses</Title>
        <Button title="all applicants" onClick={goToAllApplicants}>
          All Applicants
        </Button>
      </Group>

      <SimpleGrid spacing="70px" cols={4}>
        {assignedCourses.map((course) => (
          <Card key={course.code} shadow="sm" withBorder>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{course.name}</Text>
            </Group>

            <Text size="sm" c="dimmed">
              {course.code}
            </Text>
            <Text size="sm" c="dimmed">
              {course.semester}
            </Text>

            <Button
              mt="md"
              onClick={() => router.push(`/course/${course.code}`)}
            >
              Manage Tutors
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
