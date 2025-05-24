import ApplicationCard from "@/components/applicationCard";
import {
  Title,
  Button,
  Stack,
  Space,
  Group,
  SimpleGrid,
  Text,
  Flex,
} from "@mantine/core";
import { BarChart } from "recharts";
import { useRouter } from "next/router";
import { Application, Course } from "@/interfaces/Interfaces";
import { useEffect, useState } from "react";
import { applicationApi } from "@/services/applicationApi";
import { toast } from "react-toastify";
import { courseApi } from "@/services/courseApi";

export default function CourseDetail() {
  const router = useRouter();
  const { code } = router.query;
  const [applications, setApplications] = useState<Application[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [ranking, setRanking] = useState<Application[]>([]);
  const fetchApplications = async () => {
    try {
      const applications = await applicationApi.getCourseApplications(
        code as string
      );
      setApplications(applications);
    } catch (error) {
      toast.error("Error fetching applications");
    }
  };
  useEffect(() => {
    if (code) {
      fetchApplications();
      fetchCourse();
    }
    setRanking([]);
  }, [code]);
  const fetchCourse = async () => {
    try {
      const course = await courseApi.getCourseById(code as string);
      setCourse(course);
    } catch (error) {
      toast.error("Error fetching course");
    }
  };
  const selectApplicant = (application: Application) => {
    //if  a lecturer ranking for the current logged in lecturer exists:
    let duplicateSelection: boolean = false;
    //search  through it and look for the applicant being submitted
    for (let index = 0; index < ranking.length; index++) {
      //if it is found then set duplicateSelection to true and replace that application with the new one, in case a tutor has updated their application
      if (ranking[index].applicant.email == application.applicant.email) {
        duplicateSelection = true;
      }
    }
    //if no duplicate was found, add the applicant to the array
    if (!duplicateSelection) {
      setRanking((prevItems) => [...prevItems, application]);
    }
  };
  const moveLeft = (index: number) => {
    //checks that the applicant isnt first as you can't move an applicant higher than first
    if (index > 0) {
      let temp = ranking[index - 1];
      ranking[index - 1] = ranking[index];
      ranking[index] = temp;
      setRanking([...ranking]);
    }
  };
  //used for ranking. when the right arrow button is chosen, it shifts the applicant to the right (down in ranking).

  const moveRight = (index: number) => {
    //checks that the applicant isnt last as you can't move an applicant higher than first

    if (index < ranking.length - 1) {
      let temp = ranking[index + 1];
      ranking[index + 1] = ranking[index];
      ranking[index] = temp;
      setRanking([...ranking]);
    }
  };
  return (
    <>
      {course ? (
        <>
          <Title>{course.name + " - " + course.code}</Title>
          <Button mt="md" onClick={() => router.push(`/course/${code}`)}>
            Back
          </Button>
          <Space w="lg"></Space>
          <Stack mt="30px">
            <Group justify="space-between">
              <Title order={3}>Your Chosen Applicants</Title>
              <Group>
                {/* <Button onClick={() => submitRanking(currentCourse)}>
                      Update Your Ranking
                    </Button> */}
                {/* <Button
                      bg="red"
                      onClick={() => clearSelection(currentCourse)}
                    >
                      Reset
                    </Button> */}
              </Group>
            </Group>
            {/* displays selected tutors and allows you to submit your rankings */}
            {ranking.length > 0 ? (
              <Flex bg="gray" p="lg">
                <SimpleGrid bd="black" spacing="40px" cols={6}>
                  {ranking.map((application, index) => (
                    <>
                      <Text>{application.applicant.firstName}</Text>
                      {/* <ApplicationCard
                            applicant={application.applicant}
                            index={index}
                            buttonSetting="Rank"
                            showNumber={"showButtons"}
                            moveLeft={moveLeft}
                            moveRight={moveRight}
                            avg={0}
                            currentCourse={course}
                          /> */}
                    </>
                  ))}
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
                {applications.map((application, index) => (
                  <Flex direction="column">
                    <Text>{application.applicant.firstName}</Text>
                    {/* <ApplicationCard
                          applicant={application.applicant}
                          index={index}
                          buttonSetting="Select"
                          showNumber={"false"}
                          moveLeft={moveLeft}
                          moveRight={moveRight}
                          avg={0}
                          currentCourse={currentCourse}
                        /> */}
                    {/* <Checkbox onChan /> */}
                    <Button
                      disabled={false}
                      size="sm"
                      mt="15px"
                      onClick={() => selectApplicant(application)}
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
        <p>undefined applications</p>
      )}
    </>
  );
}
