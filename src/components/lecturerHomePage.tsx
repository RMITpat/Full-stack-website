import { Dispatch, SetStateAction, useState } from "react";
import { IndCourse } from "../interfaces/Interfaces";
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
import { useLoginContext } from "@/pages/contexts/LoginContext";
import OrderApplications from "@/components/Applications/OrderApplications";
interface tutorHomePageProps {
  courses: IndCourse[];
  setCourses: Dispatch<SetStateAction<IndCourse[]>>;
}

const lecturerHomePage: React.FC<tutorHomePageProps> = ({
                                                          courses,
                                                          setCourses,
                                                        }) => {
  const currentUser = useLoginContext();

  const [lecturerState, setLecturerState] = useState<string>("default");
  const [currentCourse, setCurrentCourse] = useState<IndCourse | null>(null);

  const viewCourse = (course: IndCourse) => {
    setCurrentCourse(course);

    setLecturerState("courseView");
    console.log(currentCourse);
  };

  return (
      <>
        {lecturerState == "default" ? (
            <>
              <Text size="lg">Hi, {currentUser.user.User_Name}!</Text>

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
                  <>
                    <Button mt="md" onClick={() => setLecturerState("default")}>
                      Back
                    </Button>
                    <Title>{currentCourse.name}</Title>
                    <SimpleGrid spacing="70px" cols={4}>
                      {currentCourse.applicants.map((applicant, index) => (
                          <Card shadow="sm" withBorder>
                            <Group justify="space-between" mt="md" mb="xs">
                              <Text fw={500}>{applicant.name}</Text>
                            </Group>

                            <Text size="sm" c="dimmed">
                              {applicant.availability}
                            </Text>
                            <Text size="sm" c="dimmed">
                              {applicant.credentials}
                            </Text>
                            <Text size="sm" c="dimmed">
                              {applicant.previousRoles}
                            </Text>
                            <Text size="sm" c="dimmed">
                              {applicant.skills}
                            </Text>

                            <Button mt="md">Select</Button>
                          </Card>
                      ))}
                      {OrderApplications(currentCourse.applicants)}
                    </SimpleGrid>

                  </>
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