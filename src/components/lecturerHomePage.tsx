import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IndCourse } from "../interfaces/Interfaces";
import { DetailValues } from "../interfaces/Interfaces";
import ApplicationCard from "@/components/applicationCard";
import Link from "next/link";
import { BarChart } from "@mantine/charts";


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
import getApplicationStatuses from "@/api/getApplicationStatuses";

import { useLoginContext } from "@/pages/contexts/LoginContext";
import OrderApplications from "@/components/Applications/OrderApplications";
import updateApplication from "@/api/UpdateApplications";
import { ApplicationDetails } from "@/interfaces/Types";
import { useLecturerState } from "@/pages/contexts/LecturerState";
interface tutorHomePageProps {
  courses: IndCourse[];
  setCourses: Dispatch<SetStateAction<IndCourse[]>>;
}
/*
Validation of user inputs:

When creating a ranking, the applicants selected are added to the course's array of lecturer rankings
This selection is then grabbed and submitted to a course's total ranking computation when the Submit Ranking button is pressed.
Therefore, a lecturer cannot submit an empty ranking as in order to submit a ranking, they have to have first created one (by selecting applicants)

A lecturer cannot choose an applicant twice as each time the select button is pressed, the course's array of lecturer rankings is searched to see
if that applicant is already present. If it is, they are not added. This can be seen in the selectApplicant function below.

*/
const lecturerHomePage: React.FC<tutorHomePageProps> = ({
  courses,
  setCourses,
}) => {
  const currentUser = useLoginContext();
  const currentEmail = currentUser.user.User_Email;
  const { lecturerState, setLecturerState } = useLecturerState();
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
    //if  a lecturer ranking for the current logged in lecturer exists:
    if (currentCourse.lecturerRankings[currentEmail]) {
      let duplicateSelection: boolean = false;
      //search  through it and look for the applicant being submitted
      for (
        let index = 0;
        index < currentCourse.lecturerRankings[currentEmail].length;
        index++
      ) {
        //if it is found then set duplicateSelection to true and replace that application with the new one, in case a tutor has updated their application
        if (
          currentCourse.lecturerRankings[currentEmail][index].email ==
          applicant.email
        ) {
          duplicateSelection = true;
        }
      }
      //if no duplicate was found, add the applicant to the array
      if (!duplicateSelection) {
        currentCourse.lecturerRankings[currentEmail] = [
          ...currentCourse.lecturerRankings[currentEmail],
          applicant,
        ];
      }
      //if a ranking does NOT exist for the current logged in lecture, create one and initialise it with the selected applicant
    } else {
      currentCourse.lecturerRankings = {
        ...currentCourse.lecturerRankings,
        [currentEmail]: [applicant],
      };
    }
    //update the local store with the new chosen applicant
    localStorage.setItem("courseDetails", JSON.stringify(courses));

    //sets the state so that the new selection can be  displayed
    setChosenApplicants([...currentCourse.lecturerRankings[currentEmail]]);
    console.log(chosenApplicants);
  };

  //used for ranking. when the left arrow button is chosen, it shifts the applicant to the left (up in ranking).

  const moveLeft = (currentCourse: IndCourse, index: number) => {
    //checks that the applicant isnt first as you can't move an applicant higher than first
    if (index > 0) {
      let temp = currentCourse.lecturerRankings[currentEmail][index - 1];
      currentCourse.lecturerRankings[currentEmail][index - 1] =
        currentCourse.lecturerRankings[currentEmail][index];
      currentCourse.lecturerRankings[currentEmail][index] = temp;
      setChosenApplicants([...currentCourse.lecturerRankings[currentEmail]]);
      localStorage.setItem("courseDetails", JSON.stringify(courses));
    }
  };
  //used for ranking. when the right arrow button is chosen, it shifts the applicant to the right (down in ranking).

  const moveRight = (currentCourse: IndCourse, index: number) => {
    //checks that the applicant isnt last as you can't move an applicant higher than first

    if (index < currentCourse.lecturerRankings[currentEmail].length - 1) {
      let temp = currentCourse.lecturerRankings[currentEmail][index + 1];
      currentCourse.lecturerRankings[currentEmail][index + 1] =
        currentCourse.lecturerRankings[currentEmail][index];
      currentCourse.lecturerRankings[currentEmail][index] = temp;
      setChosenApplicants([...currentCourse.lecturerRankings[currentEmail]]);
      localStorage.setItem("courseDetails", JSON.stringify(courses));
    }
  };

  //clears the selection when Reset is pressed
  const clearSelection = (currentCourse: IndCourse) => {
    if (currentCourse.lecturerRankings[currentEmail]) {
      currentCourse.lecturerRankings[currentEmail] = [];
      setChosenApplicants([]);
      localStorage.setItem("courseDetails", JSON.stringify(courses));
    }
  };
  const highestRankedTutors = (currentCourse: IndCourse) => {
    const applicationStatuses = getApplicationStatuses();

    //splits it so we get the emails for identification, and course for identification,  and avg ranking for sorting
    const transformedData = Object.entries(applicationStatuses).map(
      ([key, details]) => ({
        email: key.split("_")[0],
        course: key.split("_")[1],
        avgRanking: details.Avg_Ranking,
      })
    );
    //will hold the applicants for the current course
    let courseData: {
      email: string;
      course: string;
      avgRanking: number;
    }[] = [];

    transformedData.forEach((element) => {
      if (
        element.course == currentCourse.courseCode &&
        element.avgRanking > 0
      ) {
        courseData.push(element);
      }
    });
    //sort the applicants by their ranking
    if (courseData.length > 1) {
      for (let i = 1; i < courseData.length; ++i) {
        let curr = courseData[i];
        let j = i - 1;

        while (j >= 0 && courseData[j].avgRanking > curr.avgRanking) {
          courseData[j + 1] = courseData[j];
          j = j - 1;
        }
        courseData[j + 1] = curr;
      }
    }
    //holds the same applicants but in form detailValues so they can be displayed using applicationCard
    const applicantArray: DetailValues[] = [];
    for (let i = 0; i < courseData.length; ++i) {
      let currTutor = courseData[i];
      for (let j = 0; j < currentCourse.applicants.length; ++j) {
        if (currTutor.email == currentCourse.applicants[j].email) {
          applicantArray.push(currentCourse.applicants[j]);
          break;
        }
      }
    }
    return applicantArray;
  };

  const graphData = (currentCourse: IndCourse, direction: string) => {
    const applicationStatuses = getApplicationStatuses();
    const transformedData = Object.entries(applicationStatuses).map(
      ([key, details]) => ({
        email: key.split("@")[0],
        course: key.split("_")[1],
        timesChosen: details.Times_Chosen,
      })
    );

    let courseData: {
      email: string;
      course: string;
      timesChosen: number;
    }[] = [];

    transformedData.forEach((element) => {
      if (
        element.course == currentCourse.courseCode &&
        element.timesChosen > 0
      ) {
        courseData.push(element);
      }
    });
    if (courseData.length > 1) {
      for (let i = 1; i < courseData.length; ++i) {
        let curr = courseData[i];
        let j = i - 1;

        while (j >= 0 && courseData[j].timesChosen > curr.timesChosen) {
          courseData[j + 1] = courseData[j];
          j = j - 1;
        }
        courseData[j + 1] = curr;
      }
    }
    if (courseData.length > 3) {
      if (direction == "most") {
        return courseData.slice(-3);
      } else {
        return courseData.slice(0, 3);
      }
    } else {
      return courseData;
    }
  };
  const sortByTimesChosenDesc = (a: ApplicationDetails, b: ApplicationDetails) =>
      b.Times_Chosen - a.Times_Chosen;

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
            <Card  shadow="sm" withBorder>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>View all applicants</Text>
              </Group>
              
              <Text size="sm" c="dimmed">
                you can search, sort, and filter applicants by course, name, and much more! 
              </Text>

              <Button mt="md" onClick={() => setLecturerState("allApplicants")}>
                view
              </Button>
            </Card>
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
                  {highestRankedTutors(currentCourse).length == 0 ? (
                    <Text>No tutors have been ranked.</Text>
                  ) : (
                    highestRankedTutors(currentCourse).map(
                      (applicant, index) => (
                        <ApplicationCard
                          key={index}
                          applicant={applicant}
                          index={index}
                          buttonSetting="noButton"
                          showNumber={"numberOnly"}
                          moveLeft={moveLeft}
                          moveRight={moveRight}
                          currentCourse={currentCourse}
                        />
                      )
                    )
                  )}

                  {/*<OrderApplications*/}
                  {/*    applicants={currentCourse.applicants}*/}
                  {/*    courseCode={currentCourse.courseCode}*/}
                  {/*    sortFn={(a, b) =>*/}
                  {/*        b.Avg_Ranking - a.Avg_Ranking} //desceding order*/}
                  {/*  />*/}
                </SimpleGrid>
              </Stack>
              <Title order={2}>Applicant Data</Title>

              <Group justify="space-around">
                <Stack w="30%">
                  <Title order={4}>Top 3 Most Chosen Tutors</Title>
                  {graphData(currentCourse, "most").length == 0 ? (
                    <Text>No applicants have been ranked. </Text>
                  ) : (
                    <BarChart
                      h={300}
                      data={graphData(currentCourse, "most")}
                      dataKey="email"
                      series={[{ name: "timesChosen", color: "violet.6" }]}
                      tickLine="y"
                      xAxisLabel="Tutors"
                      yAxisLabel="Times Chosen"
                    />
                  )}
                </Stack>
                <Stack w="30%">
                  <Title order={4}>Top 3 Least Chosen Tutors</Title>
                  {graphData(currentCourse, "least").length == 0 ? (
                    <Text>No applicants have been ranked. </Text>
                  ) : (
                    <BarChart
                      h={300}
                      data={graphData(currentCourse, "least")}
                      dataKey="email"
                      series={[{ name: "timesChosen", color: "violet.6" }]}
                      tickLine="y"
                      xAxisLabel="Tutors"
                      yAxisLabel="Times Chosen"
                    />
                  )}
                </Stack>
              </Group>
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
                    <Button onClick={() => updateApplication(currentCourse)}>
                      Submit Ranking
                    </Button>
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
                          <ApplicationCard
                            applicant={applicant}
                            index={index}
                            buttonSetting="Rank"
                            showNumber={"showButtons"}
                            moveLeft={moveLeft}
                            moveRight={moveRight}
                            currentCourse={currentCourse}
                          />
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
                          showNumber={"false"}
                          moveLeft={moveLeft}
                          moveRight={moveRight}
                          currentCourse={currentCourse}
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
                    {/*<OrderApplications*/}
                    {/*    applicants={currentCourse.applicants}*/}
                    {/*    courseCode={currentCourse.courseCode}*/}
                    {/*    sortFn={(a, b) =>*/}
                    {/*        b.Avg_Ranking - a.Avg_Ranking} //desceding order*/}
                    {/*/>*/}
                  </SimpleGrid>
                </Flex>
              </Stack>
            </>
          ) : (
            <p>undefined</p>
          )}
        </>
      ) : lecturerState == "allApplicants" ?(
          <>
            <OrderApplications
                sortFn={sortByTimesChosenDesc}
                // courseCode=""
                // availability=""
                //searchTerm=""
                //chosen={true}
            />
          </>
      ) : (
        <p>Unknown status</p>
      )}
    </>
  );
};

export default lecturerHomePage;
