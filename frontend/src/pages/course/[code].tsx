import ApplicationCard from "@/components/applicationCard";
import {
  Title,
  Button,
  Stack,
  Space,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { BarChart } from "recharts";
import { useRouter } from "next/router";
import { Course } from "@/interfaces/Interfaces";
import { useEffect, useState } from "react";
import { courseApi } from "@/services/courseApi";
import { toast } from "react-toastify";

export default function CourseDetail() {
  const router = useRouter();
  const { code } = router.query;
  const [course, setCourse] = useState<Course | null>(null);

  const fetchCourse = async () => {
    try {
      const course = await courseApi.getCourseById(code as string);
      setCourse(course);
    } catch (error) {
      toast.error("Error fetching course");
    }
  };
  useEffect(() => {
    if (code) {
      fetchCourse();
    }
  }, [code]);
  // const highestRankedTutors = (currentCourse: Course) => {
  //   const applicationStatuses = getApplicationStatuses();
  //   console.log("highestRankedtutor called" + currentCourse);
  //   //splits it so we get the emails for identification, and course for identification,  and avg ranking for sorting
  //   const transformedData = Object.entries(applicationStatuses).map(
  //     ([key, details]) => ({
  //       email: key.split("_")[0],
  //       course: key.split("_")[1],
  //       avgRanking: details.Avg_Ranking,
  //     })
  //   );
  //   //will hold the applicants for the current course
  //   let courseData: {
  //     email: string;
  //     course: string;
  //     avgRanking: number;
  //   }[] = [];

  //   transformedData.forEach((element) => {
  //     if (
  //       element.course == currentCourse.courseCode &&
  //       element.avgRanking > 0
  //     ) {
  //       courseData.push(element);
  //     }
  //   });
  //   //sort the applicants by their ranking
  //   if (courseData.length > 1) {
  //     for (let i = 1; i < courseData.length; ++i) {
  //       let curr = courseData[i];
  //       let j = i - 1;

  //       while (j >= 0 && courseData[j].avgRanking > curr.avgRanking) {
  //         courseData[j + 1] = courseData[j];
  //         j = j - 1;
  //       }
  //       courseData[j + 1] = curr;
  //     }
  //   }
  //   //holds the same applicants but in form detailValues so they can be displayed using applicationCard
  //   const applicantArray: DetailValues[] = [];
  //   for (let i = 0; i < courseData.length; ++i) {
  //     let currTutor = courseData[i];
  //     for (let j = 0; j < currentCourse.applicants.length; ++j) {
  //       if (currTutor.email == currentCourse.applicants[j].email) {
  //         applicantArray.push(currentCourse.applicants[j]);
  //         break;
  //       }
  //     }
  //   }
  //   return applicantArray;
  // };

  // const graphData = (currentCourse: Course) => {
  //   const applicationStatuses = getApplicationStatuses();
  //   const transformedData = Object.entries(applicationStatuses).map(
  //     ([key, details]) => ({
  //       email: key.split("@")[0],
  //       course: key.split("_")[1],
  //       timesChosen: details.Times_Chosen,
  //     })
  //   );

  //   let courseData: {
  //     email: string;
  //     course: string;
  //     timesChosen: number;
  //   }[] = [];

  //   transformedData.forEach((element) => {
  //     if (element.course == currentCourse.courseCode) {
  //       courseData.push(element);
  //     }
  //   });
  //   if (courseData.length > 1) {
  //     for (let i = 1; i < courseData.length; ++i) {
  //       let curr = courseData[i];
  //       let j = i - 1;

  //       while (j >= 0 && courseData[j].timesChosen > curr.timesChosen) {
  //         courseData[j + 1] = courseData[j];
  //         j = j - 1;
  //       }
  //       courseData[j + 1] = curr;
  //     }
  //   }

  //   return courseData;
  // };

  return (
    <>
      {course ? (
        <>
          <Title>{course.name + " - " + course.code}</Title>
          <Button mt="md" onClick={() => router.push("/")}>
            Back
          </Button>
          <Stack>
            <Space w="lg"></Space>
            <Group justify="space-between">
              <Title order={2}>Highest Ranked Applicants</Title>
              <Button onClick={() => router.push("/")}>Rank Applicants</Button>
            </Group>
            {/* <SimpleGrid bd="sm" spacing="70px" cols={5}>
        {highestRankedTutors(course).length == 0 ? (
          <Text>No tutors have been ranked.</Text>
        ) : (
          highestRankedTutors(course).map(
            (applicant, index) => (
              <ApplicationCard
                key={index}
                applicant={applicant}
                index={index}
                buttonSetting="noButton"
                avg={getAvgRanking(course, applicant)}
                showNumber={"numberOnly"}
                moveLeft={moveLeft}
                moveRight={moveRight}
                course={course}
              />
            )
          )
        )}
      </SimpleGrid> */}
          </Stack>
          <Title order={2}>Applicant Data</Title>
          <Group justify="center" w="100%">
            <Stack align="center" w="50%">
              <Title order={4}>Most Chosen Tutors</Title>
              {/* {graphData(course).length == 0 ? (
          <Text>No applicants have been ranked. </Text>
        ) : (
          <BarChart
            h={300}
            data={graphData(course)}
            dataKey="email"
            series={[{ name: "timesChosen", color: "violet.6" }]}
            tickLine="y"
            xAxisLabel="Tutors"
            yAxisLabel="Times Chosen"
          />
        )} */}
            </Stack>
          </Group>
        </>
      ) : (
        <p>undefined</p>
      )}
    </>
  );
}
