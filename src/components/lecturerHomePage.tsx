import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IndCourse } from "../interfaces/Interfaces";
import { DetailValues } from "../interfaces/Interfaces";
import ApplicationCard from "@/components/applicationCard";
import Link from "next/link";

import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
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
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

import { useLoginContext } from "@/pages/contexts/LoginContext";
import OrderApplications from "@/components/Applications/OrderApplications";
import updateApplication from "@/api/UpdateApplications";
interface tutorHomePageProps {
  courses: IndCourse[];
  setCourses: Dispatch<SetStateAction<IndCourse[]>>;
}
/*
course has OverallRanking[]
it is filled with all the applications from that course that have been voted on by lecturers

to display most voted it just displays applications[] that have more than one timeschosen, sorted by avg ranking

when a lecturer submits a ranking it:
1. updates the timechosen for that application and its other details like total ranking and avg ranking
2. saves their ranking to local storage in their user

*/
const lecturerHomePage: React.FC<tutorHomePageProps> = ({
  courses,
  setCourses,
}) => {
  const currentUser = useLoginContext();
  const currentEmail = currentUser.user.User_Email;
  const [lecturerState, setLecturerState] = useState<string>("default");
    const [currentCourse, setCurrentCourse] = useState<IndCourse | null>(null);
  const [chosenApplicants, setChosenApplicants] = useState<DetailValues[]>([]);

  useEffect(() => {
    console.log("lecturer state changed");
    if (currentCourse) {
      const lastChosenApplicants = currentCourse.lecturerRankings[currentEmail];
      if (lastChosenApplicants) {
        setChosenApplicants(lastChosenApplicants);

      }
    }
  }, [lecturerState]);
  useEffect(() => {
    console.log("Updated applicants:", chosenApplicants);
  }, [chosenApplicants]);
  const viewCourse = (course: IndCourse) => {
    setCurrentCourse(course);
    setLecturerState("courseView");
    console.log(currentCourse);
  };
  const selectApplicant = (
    applicant: DetailValues,
    currentCourse: IndCourse
  ) => {
    if (currentCourse.lecturerRankings[currentEmail]) {
      let duplicateSelection: boolean = false;
      for (
        let index = 0;
        index < currentCourse.lecturerRankings[currentEmail].length;
        index++
      ) {
        if (
          currentCourse.lecturerRankings[currentEmail][index].email ==
          applicant.email
        ) {
          duplicateSelection = true;
        }
      }
      if (!duplicateSelection) {
        currentCourse.lecturerRankings[currentEmail] = [
          ...currentCourse.lecturerRankings[currentEmail],
          applicant,
        ];
      }
    } else {
      currentCourse.lecturerRankings = {
        ...currentCourse.lecturerRankings,
        [currentEmail]: [applicant],
      };
    }
    localStorage.setItem("courseDetails", JSON.stringify(courses));
    setChosenApplicants([...currentCourse.lecturerRankings[currentEmail]]);
    console.log(chosenApplicants);
  };

  const moveLeft = (currentCourse: IndCourse, index: number) => {
    if (index > 0) {
      let temp = currentCourse.lecturerRankings[currentEmail][index - 1];
      currentCourse.lecturerRankings[currentEmail][index - 1] =
        currentCourse.lecturerRankings[currentEmail][index];
      currentCourse.lecturerRankings[currentEmail][index] = temp;
      setChosenApplicants([...currentCourse.lecturerRankings[currentEmail]]);
    }
  };

  const moveRight = (currentCourse: IndCourse, index: number) => {
    if (index < currentCourse.lecturerRankings[currentEmail].length - 1) {
      let temp = currentCourse.lecturerRankings[currentEmail][index + 1];
      currentCourse.lecturerRankings[currentEmail][index + 1] =
        currentCourse.lecturerRankings[currentEmail][index];
      currentCourse.lecturerRankings[currentEmail][index] = temp;
      setChosenApplicants([...currentCourse.lecturerRankings[currentEmail]]);
    }
  };
  const clearSelection = (currentCourse: IndCourse) => {
    if (currentCourse.lecturerRankings[currentEmail]) {
      currentCourse.lecturerRankings[currentEmail] = [];
      setChosenApplicants([]);
    }
  };
  return (
    <>
      {lecturerState == "default" ? (
        <>
          <Text size="lg">Hi, {currentUser.user.User_Name}!</Text>

          <Title mb="sm">Courses</Title>
          <SimpleGrid spacing="70px" cols={4}>
            {courses.map((course, index) => (
              <Card key={index} shadow="sm" withBorder>
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
                    <ApplicationCard key={index}
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
                  <Group>
                    <Button
                    onClick={() => updateApplication(currentCourse)}
                    >Submit Ranking</Button>
                    <Button
                      bg="red"
                      onClick={() => clearSelection(currentCourse)}
                    >
                      Reset
                    </Button>
                  </Group>
                </Group>

                {chosenApplicants.length > 0 ? (
                  <Flex bg="gray" p="lg">
                    <SimpleGrid bd="black" spacing="40px" cols={6}>
                      {chosenApplicants.map((applicant, index) => (
                        <>
                          <Card shadow="sm" withBorder>
                            <Group justify="space-between">
                              <Button
                                leftSection={<IconArrowNarrowLeft />}
                                onClick={() => moveLeft(currentCourse, index)}
                              ></Button>
                              <Title order={3}>{index + 1}</Title>

                              <Button
                                rightSection={<IconArrowNarrowRight />}
                                onClick={() => moveRight(currentCourse, index)}
                              ></Button>
                            </Group>

                            <Group justify="space-between" mt="md" mb="xs">
                              <Text fw={500}>{applicant.name}</Text>
                              <Badge>{applicant.availability}</Badge>
                            </Group>
                            <Stack gap="0px">
                              <Text size="sm">Credentials</Text>
                              <Text size="sm" c="dimmed">
                                {applicant.credentials}
                              </Text>

                              <Text size="sm">Previous Roles</Text>

                              <Text size="sm" c="dimmed">
                                {applicant.previousRoles}
                              </Text>
                              <Text size="sm">Skills</Text>

                              <Text size="sm" c="dimmed">
                                {applicant.skills}
                              </Text>
                            </Stack>
                            {/* {buttonSetting != "noButton" && <Button mt="md">{buttonSetting}</Button>} */}
                          </Card>
                          {/* <ApplicationCard
                          applicant={applicant}
                          index={index}
                          buttonSetting="Rank"
                          showNumber={true}
                        /> */}
                        </>
                      ))}
                      {/* {OrderApplications(currentCourse.applicants)} */}
                    </SimpleGrid>
                  </Flex>
                ) : (
                  <p>No applicants chosen.</p>
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
                        {/* <Checkbox onChan /> */}
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
