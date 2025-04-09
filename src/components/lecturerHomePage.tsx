import { Dispatch, SetStateAction, useState } from "react";
import { Course } from "../interfaces/interfaces";
import { DetailValues } from "../interfaces/interfaces";
import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { map } from "framer-motion/m";
interface tutorHomePageProps {
  courses: Course[];
  setCourses: Dispatch<SetStateAction<Course[]>>;
}

const lecturerHomePage: React.FC<tutorHomePageProps> = ({
  courses,
  setCourses,
}) => {
  const [lecturerState, setLecturerState] = useState<string>("default");
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  const viewCourse = (course: Course) => {
    setCurrentCourse(course);

    setLecturerState("courseView");
    console.log(currentCourse);
  };

  return (
    <>
      {lecturerState == "default" ? (
        <>
          <Title mb="sm">Courses</Title>
          <SimpleGrid spacing="70px" cols={4}>
            {courses.map((course, index) => (
              <Card shadow="sm" withBorder>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{course.name}</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  {course.courseCode}
                </Text>
                <Text size="sm" c="dimmed">
                  {course.semester}
                </Text>

                <Button mt="md" onClick={() => viewCourse(course)}>
                  Manage Tutors
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        </>
      ) : lecturerState == "courseView" ? (
        <>
          {currentCourse ? (
            <Title>{currentCourse.name}</Title>
          ) : (
            <p>undefined</p>
          )}
        </>
      ) : (
        <p>Unknown status</p>
      )}
    </>
  );
};

export default lecturerHomePage;
