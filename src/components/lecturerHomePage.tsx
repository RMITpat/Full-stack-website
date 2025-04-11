import { Dispatch, SetStateAction, useState } from "react";
import { IndCourse } from "../interfaces/Interfaces";
import { DetailValues } from "../interfaces/Interfaces";
import ApplicationCard from "@/components/applicationCard";
import Link from "next/link";

import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Space,
  Stack,
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
  const [chosenApplicants, setChosenApplicants] = useState<DetailValues[]>([]);

  const viewCourse = (course: IndCourse) => {
    setCurrentCourse(course);

    setLecturerState("courseView");
    console.log(currentCourse);
  };
  const selectApplicant = (
    applicant: DetailValues,
    currentCourse: IndCourse
  ) => {
    let duplicateSelection: boolean = false;
    for (
      let index = 0;
      index < currentCourse.selectedApplicants.length;
      index++
    ) {
      if (currentCourse.selectedApplicants[index].email == applicant.email) {
        duplicateSelection = true;
      }
    }
    if (!duplicateSelection) {
      // setChosenApplicants((prevItems) => [...prevItems, applicant]);
      currentCourse.selectedApplicants.push(applicant);

      setChosenApplicants(currentCourse.selectedApplicants);
    }
  };
  const clearSelection = (currentCourse: IndCourse) => {
    currentCourse.selectedApplicants = [];
    setChosenApplicants([]);
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
              <Title>{currentCourse.name}</Title>
              <Button mt="md" onClick={() => setLecturerState("default")}>
                Back
              </Button>
              <Stack>
                <Space w="lg"></Space>
                <Group justify="space-between">
                  <Title order={2}>Most Chosen Applicants</Title>
                  <Button onClick={() => setLecturerState("chooseTutors")}>
                    Rank Applicants
                  </Button>
                </Group>
                <SimpleGrid bd="sm" spacing="70px" cols={4}>
                  {currentCourse.applicants.map((applicant, index) => (
                    <ApplicationCard
                      applicant={applicant}
                      index={index}
                      buttonSetting="noButton"
                      showNumber={true}
                    />
                  ))}
                </SimpleGrid>
                <p>most chosen data visualisation</p>
              </Stack>
            </>
          ) : (
            <p>undefined</p>
          )}
        </>
      ) : lecturerState == "chooseTutors" ? (
        <>
          {currentCourse ? (
            <>
              <Title>{currentCourse.name}</Title>
              <Button mt="md" onClick={() => setLecturerState("courseView")}>
                Back
              </Button>
              <Space w="lg"></Space>
              <Stack mt="30px">
                <Group justify="space-between">
                  <Title order={3}>Your Chosen Applicants</Title>
                  <Button
                    bg="red"
                    onClick={() => clearSelection(currentCourse)}
                  >
                    Reset
                  </Button>
                </Group>

                {currentCourse.selectedApplicants.length == 0 ? (
                  <p>No applicants chosen.</p>
                ) : (
                  <Flex bg="gray" p="lg">
                    <SimpleGrid bd="black" spacing="40px" cols={6}>
                      {currentCourse.selectedApplicants.map(
                        (applicant, index) => (
                          <>
                            <ApplicationCard
                              applicant={applicant}
                              index={index}
                              buttonSetting="Rank"
                              showNumber={true}
                            />
                          </>
                        )
                      )}
                      {OrderApplications(currentCourse.applicants)}
                    </SimpleGrid>
                  </Flex>
                )}
              </Stack>
              <Stack mt="30px">
                <Title order={3}>All Applicants</Title>
                <Flex p="lg">
                  <SimpleGrid bd="sm" spacing="40px" cols={6}>
                    {currentCourse.applicants.map((applicant, index) => (
                      <Flex direction="column">
                        <ApplicationCard
                          applicant={applicant}
                          index={index}
                          buttonSetting="Select"
                          showNumber={false}
                        />
                        <Button
                          disabled={false}
                          size="sm"
                          mt="15px"
                          onClick={() =>
                            selectApplicant(applicant, currentCourse)
                          }
                        >
                          Select
                        </Button>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Flex>
              </Stack>

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
