import ApplicationCard from "@/components/applicationCard";
import {
  Title,
  Button,
  Stack,
  Space,
  Group,
  SimpleGrid,
  Text,
  Modal,
  List,
} from "@mantine/core";

import { BarChart } from "@mantine/charts";
import { useRouter } from "next/router";
import { Application, Course, Vote } from "@/interfaces/Interfaces";
import { useEffect, useState } from "react";
import { courseApi } from "@/services/courseApi";
import { toast } from "react-toastify";
import { voteApi } from "@/services/voteApi";
import "@mantine/charts/styles.css";

export default function CourseDetail() {
  const router = useRouter();
  const { code } = router.query;
  const [course, setCourse] = useState<Course | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [currentApplication, setCurrentApplication] =
    useState<Application | null>(null);

  const fetchCourse = async () => {
    try {
      const course = await courseApi.getCourseById(code as string);
      setCourse(course);
    } catch (error) {
      toast.error("Error fetching course");
    }
  };

  const fetchCourseVotes = async () => {
    try {
      const votes = await voteApi.getVotes();

      const courseVotes = (await votes).filter(
        (vote: Vote) => vote.application.course.code == code
      );
      calculateAverages(courseVotes);
    } catch (err) {
      toast.error("Failed to get course votes");
    }
  };
  useEffect(() => {
    if (code) {
      fetchCourse();
      fetchCourseVotes();
    }
  }, [code]);

  const calculateAverages = (votes: Vote[]) => {
    console.log("caulcated avgs");
    let applicationIds: number[] = [];
    let applications: Application[] = [];
    console.log(votes);
    votes.forEach((vote) => {
      if (!applicationIds.includes(vote.application.id)) {
        applicationIds.push(vote.application.id);
        applications.push(vote.application);
      }
    });
    let currentSum = 0;
    let averageRanking = 0;
    let count = 0;
    console.log(applicationIds);
    applications.forEach((application) => {
      currentSum = 0;
      averageRanking = 0;
      count = 0;
      if (!application.comments) {
        application.comments = [];
      }
      votes.forEach((vote) => {
        if (vote.application.id == application.id) {
          if (vote.comment.length > 0) {
            application.comments.push(vote.comment);
          }
          currentSum += vote.ranking;
          count += 1;
        }
      });
      application.timesChosen = count;
      application.averageRanking = Math.round((currentSum / count) * 100) / 100;
      console.log(
        application.applicant.firstName,
        " sum is ",
        currentSum,
        " count is ",
        count,
        " average is ",
        currentSum / count
      );
      console.log(application.comments);
    });
    applications.sort((a, b) => a.averageRanking - b.averageRanking);
    setApplications(applications);
    console.log(applications);
  };

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
              <Button onClick={() => router.push(`/applications/${code}`)}>
                Rank Applicants
              </Button>
            </Group>
            <SimpleGrid bd="sm" spacing="70px" cols={5}>
              {applications.length == 0 ? (
                <Text>No tutors have been ranked.</Text>
              ) : (
                applications.map((application) => (
                  <Stack key={application.id}>
                    {application.averageRanking}
                    <ApplicationCard application={application} />
                    <Button onClick={() => setCurrentApplication(application)}>
                      Comments
                    </Button>
                  </Stack>
                ))
              )}
              <Modal
                opened={currentApplication !== null}
                onClose={() => setCurrentApplication(null)}
                title="Lecturer Comments"
                centered
              >
                <Stack>
                  <List>
                    {currentApplication != null &&
                    currentApplication.comments.length > 0 ? (
                      currentApplication.comments.map((comment) => (
                        <List.Item>{comment}</List.Item>
                      ))
                    ) : (
                      <Text>No comments</Text>
                    )}
                  </List>
                </Stack>
              </Modal>
            </SimpleGrid>
          </Stack>
          <Title order={2}>Applicant Data</Title>
          <Group justify="center" w="100%">
            <Stack align="center" w="50%">
              <Title order={4}>Most Chosen Tutors</Title>
              {applications.length == 0 ? (
                <Text>No applicants have been ranked. </Text>
              ) : (
                <BarChart
                  h={300}
                  data={applications}
                  dataKey="applicant.email"
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
  );
}
