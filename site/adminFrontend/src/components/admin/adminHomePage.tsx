import { useEffect, useState } from "react";

import { Button, Card, Group, SimpleGrid, Text, Title } from "@mantine/core";

import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Course } from "@/interfaces/Interfaces";

import { adminService } from "@/graphQLservices/api";
export default function AdminHomePage() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  const router = useRouter();

  const fetchCourses = async () => {
    try {
      const courses = await adminService.getCourses();
      setAllCourses(courses);
      console.log(courses);
    } catch {
      toast.error("Failed to fetch courses");
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
      <Group mb="md" justify="space-between">
        <Title mb="sm">All Courses</Title>

        <Group>
          <Button mt="md" onClick={() => router.push("/Candidates")}>
            Manage all candidates
          </Button>
          <Button mt="md" onClick={() => router.push("/CreateCourse")}>
            Create course
          </Button>
        </Group>
      </Group>

      <SimpleGrid spacing="70px" cols={4}>
        {allCourses.map((course) => (
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
              Manage Course
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
