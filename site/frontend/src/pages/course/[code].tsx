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

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/router";
import { Application, Course } from "@/interfaces/Interfaces";
import { useEffect, useState } from "react";
import { courseApi } from "@/services/courseApi";
import { toast } from "react-toastify";
import { voteApi } from "@/services/voteApi";
import "@mantine/charts/styles.css";
import { applicationApi } from "@/services/applicationApi";

export default function CourseDetail() {
  const router = useRouter();

  const { code } = router.query;
  const [course, setCourse] = useState<Course | null>(null);
  const [applications, setApplications] = useState<
    { avgRank: number; application: Application }[]
  >([]);
  const [data, setData] = useState<
    { type: string; timesChosen: number; firstName: string; lastName: string }[]
  >([]);
  const [currentComments, setCurrentComments] = useState<
    { vote_id: number; vote_comment: string }[] | null
  >(null);

  const fetchApplicationComments = async (
    applicationId: number,
    courseId: number
  ) => {
    try {
      const comments = await applicationApi.getComments(
        applicationId,
        courseId
      );
      setCurrentComments(comments);
    } catch {
      toast.error("Error fetching comments");
    }
  };
  const fetchAverageRankings = async (course: Course) => {
    try {
      if (course) {
        const avgs = await voteApi.getAverageRankings(course.id);
        setApplications(avgs);
      } else {
        console.log("no course");
      }
    } catch {
      toast.error("Failed to get average rankings");
    }
  };
  const fetchGraphData = async (course: Course) => {
    console.log("fetching grpah data");
    try {
      if (course) {
        const votes = await applicationApi.getTimesChosenForCourse(course.id);
        console.log(votes);
        setData(votes);
      } else {
        console.log("no course");
      }
    } catch {
      toast.error("Failed to get course votes");
    }
    console.log("done");
  };
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await courseApi.getCourseById(code as string);
        setCourse(course);
        fetchGraphData(course);
        fetchAverageRankings(course);
      } catch {
        toast.error("Error fetching course");
      }
    };
    if (code) {
      fetchCourse();
    }
  }, [code]);

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
                  <Stack key={application.application.id} bd="md">
                    <Title order={3}>
                      Avg rank: {(application.avgRank * 100) / 100}
                    </Title>
                    <ApplicationCard application={application.application} />
                    <Button
                      onClick={() =>
                        fetchApplicationComments(
                          application.application.id,
                          course.id
                        )
                      }
                    >
                      Comments
                    </Button>
                  </Stack>
                ))
              )}
              <Modal
                opened={currentComments != null}
                onClose={() => setCurrentComments(null)}
                title="Lecturer Comments"
                centered
              >
                <Stack>
                  <List>
                    {currentComments != null && currentComments.length > 0 ? (
                      currentComments.map((comment) => (
                        <List.Item key={comment.vote_id}>
                          {comment.vote_comment}
                        </List.Item>
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
            <Stack align="center" w="100%">
              <Title order={4}>Most Chosen Applications</Title>
              {applications.length == 0 ? (
                <Text>No applicants have been ranked. </Text>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data} barCategoryGap={40}>
                    <XAxis
                      dataKey={(key) =>
                        `${key.firstName} ${key.lastName} as ${key.type}`
                      }
                    />
                    <YAxis />
                    <Bar dataKey="timesChosen" fill="#8884d8" />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
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
