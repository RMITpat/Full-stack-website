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
  Textarea,
} from "@mantine/core";
import { BarChart } from "recharts";
import { useRouter } from "next/router";
import { Application, Course } from "@/interfaces/Interfaces";
import { useEffect, useState } from "react";
import { applicationApi } from "@/services/applicationApi";
import { toast } from "react-toastify";
import { courseApi } from "@/services/courseApi";
import { Vote } from "@/interfaces/Interfaces";
import { voteApi } from "@/services/voteApi";
import { useLoginContext } from "../contexts/LoginContext";
import { useForm } from "@mantine/form";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
export default function CourseDetail() {
  const currentUser = useLoginContext();

  const router = useRouter();
  const { code } = router.query;
  const [applications, setApplications] = useState<Application[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [ranking, setRanking] = useState<Vote[]>([]);
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
      if (
        ranking[index].application.applicant.email ==
        application.applicant.email
      ) {
        duplicateSelection = true;
      }
    }
    //if no duplicate was found, add the applicant to the array
    if (!duplicateSelection) {
      const newVote: Vote = {
        id: -1,
        ranking: ranking.length - 1,
        lecturerId: currentUser.user.User_id,
        application: application,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setRanking((prevItems) => [...prevItems, newVote]);
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

  const submitRanking = () => {
    try {
      ranking.forEach((vote, index) => {
        try {
          voteApi.createVote({
            ranking: index + 1,
            lecturerId: currentUser.user.User_id,
            applicationId: vote.application.id,
            comment: vote.comment,
          });
        } catch (err) {
          toast.error(`Failed to vote on application ${vote.application.id}`);
        }
      });
      toast.success("Ranking submitted successfully!");
    } catch (err) {
      toast.error("Failed to submit ranking");
    }
  };
  const commentForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      comment: "",
    },

    validate: {
      comment: (value: string) =>
        value.trim().length > 0 ? null : "Comment cannot be empty",
    },
  });
  const handleSubmit = (values: typeof commentForm.values, vote: Vote) => {
    vote.comment = values.comment;
    console.log(ranking);
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
                <Button onClick={() => submitRanking()}>
                  Update Your Ranking
                </Button>
                {/* <Button bg="red" onClick={() => clearSelection(currentCourse)}>
                  Reset
                </Button> */}
              </Group>
            </Group>
            {/* displays selected tutors and allows you to submit your rankings */}
            {ranking.length > 0 ? (
              <Flex bg="gray" p="lg">
                <SimpleGrid bd="black" spacing="40px" cols={5}>
                  {ranking.map((vote, index) => (
                    <Stack bg="white" p="md" justify="center">
                      <Group justify="space-between">
                        <Button
                          leftSection={<IconArrowNarrowLeft />}
                          onClick={() => moveLeft(index)}
                        ></Button>
                        <Title order={3}>{index + 1}</Title>

                        <Button
                          rightSection={<IconArrowNarrowRight />}
                          onClick={() => moveRight(index)}
                        ></Button>
                      </Group>
                      <ApplicationCard application={vote.application} />
                      <form
                        onSubmit={commentForm.onSubmit((values: string) =>
                          handleSubmit(values, vote)
                        )}
                      >
                        <Textarea
                          {...commentForm.getInputProps("comment")}
                          mt="md"
                          //onBlur={() => handleSubmit(commentForm.values, vote)}
                          label="Comment"
                          placeholder={vote.comment}
                          autosize
                        />
                        <Group justify="center" mt="md">
                          <Button type="submit">Add Comment</Button>
                        </Group>
                      </form>
                    </Stack>
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
                    <ApplicationCard application={application} />
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
