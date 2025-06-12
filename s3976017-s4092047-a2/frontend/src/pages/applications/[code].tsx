import ApplicationCard from "@/components/applicationCard";
import {
  Title,
  Button,
  Stack,
  Space,
  Group,
  SimpleGrid,
  Flex,
  Textarea,
} from "@mantine/core";
import { useRouter } from "next/router";
import { Application, Course } from "@/interfaces/Interfaces";
import { useEffect, useRef, useState } from "react";
import { applicationApi } from "@/services/applicationApi";
import { toast } from "react-toastify";
import { courseApi } from "@/services/courseApi";
import { Vote } from "@/interfaces/Interfaces";
import { voteApi } from "@/services/voteApi";
import { useLoginContext } from "../../contexts/LoginContext";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
export default function CourseDetail() {
  const router = useRouter();
  const { code } = router.query;
  const [applications, setApplications] = useState<Application[]>([]);
  const [comments, setComments] = useState<Record<number, string>>({});

  const [course, setCourse] = useState<Course | null>(null);
  const [ranking, setRanking] = useState<Vote[]>([]);
  const currentUser = useLoginContext();

  const currVoteId = useRef(0);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const applications = await applicationApi.getCourseApplications(
          code as string
        );
        setApplications(applications);
      } catch {
        toast.error("Error fetching applications");
      }
    };
    const fetchLecturerVotes = async () => {
      try {
        const lecturerVotes = await voteApi.getLecturerVotes(
          currentUser.user.User_id
        );
        console.log(lecturerVotes);
        console.log("ranking set");
        const lecturerCourseVotes = (await lecturerVotes).filter(
          (vote: Vote) => vote.application.course.code == code
        );
        setRanking(lecturerCourseVotes);
      } catch (error) {
        console.log(error);
        toast.error("Failed to find lecturer votes");
      }
    };
    const fetchCourse = async () => {
      try {
        const course = await courseApi.getCourseById(code as string);
        setCourse(course);
        console.log(course);
      } catch {
        toast.error("Error fetching course");
      }
    };
    if (code) {
      fetchApplications();
      fetchCourse();
      fetchLecturerVotes();
    }
  }, [code, currentUser.user.User_id]);

  const selectApplicant = (application: Application) => {
    //if  a lecturer ranking for the current logged in lecturer exists:
    let duplicateSelection: boolean = false;
    //search  through it and look for the applicant being submitted
    for (let index = 0; index < ranking.length; index++) {
      //if it is found then set duplicateSelection to true and replace that application with the new one, in case a tutor has updated their application
      if (ranking[index].application.id == application.id) {
        duplicateSelection = true;
      }
    }
    //if no duplicate was found, add the applicant to the array
    if (!duplicateSelection) {
      const newVote: Vote = {
        id: currVoteId.current,
        ranking: ranking.length - 1,
        lecturerId: currentUser.user.User_id,
        application: application,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      currVoteId.current += 1;
      setRanking((prevItems) => [...prevItems, newVote]);
    }
  };
  const moveLeft = (index: number) => {
    //checks that the applicant isnt first as you can't move an applicant higher than first
    if (index > 0) {
      const temp = ranking[index - 1];
      ranking[index - 1] = ranking[index];
      ranking[index] = temp;
      setRanking([...ranking]);
    }
  };
  //used for ranking. when the right arrow button is chosen, it shifts the applicant to the right (down in ranking).

  const moveRight = (index: number) => {
    //checks that the applicant isnt last as you can't move an applicant higher than first

    if (index < ranking.length - 1) {
      const temp = ranking[index + 1];
      ranking[index + 1] = ranking[index];
      ranking[index] = temp;
      setRanking([...ranking]);
    }
  };
  const saveVotes = async () => {
    console.log(ranking);
    ranking.forEach((vote, index) => {
      try {
        voteApi.createVote({
          ranking: index + 1,
          lecturerId: currentUser.user.User_id,
          applicationId: vote.application.id,
          comment: vote.comment,
        });
      } catch {
        toast.error(`Failed to vote on application ${vote.application.id}`);
      }
    });
    toast.success("Ranking submitted successfully!");
  };

  const deleteOldVotes = async () => {
    const lecturerVotes = await voteApi.getLecturerVotes(
      currentUser.user.User_id
    );
    console.log(lecturerVotes);
    const lecturerCourseVotes = (await lecturerVotes).filter(
      (vote: Vote) => vote.application.course.code == code
    );

    lecturerCourseVotes.forEach(
      async (vote: { application: { id: number } }) => {
        await voteApi.deleteVote(currentUser.user.User_id, vote.application.id);
      }
    );
  };
  const submitRanking = () => {
    deleteOldVotes();
    saveVotes();
  };

  const clearSelection = () => {
    setRanking([]);
  };

  const handleSubmitComment = async (vote: Vote) => {
    vote.comment = comments[vote.id];
    toast.success(
      `Updated comment for ${vote.application.applicant.firstName} ${vote.application.applicant.lastName}`
    );
  };
  const handleChange = (voteId: number, value: string) => {
    setComments((prev) => ({ ...prev, [voteId]: value }));
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
                  Update Ranking and Comments
                </Button>
                <Button bg="red" onClick={() => clearSelection()}>
                  Reset
                </Button>
              </Group>
            </Group>
            {/* displays selected tutors and allows you to submit your rankings */}
            {ranking.length > 0 ? (
              <Flex bg="gray" p="lg">
                <SimpleGrid bd="black" spacing="40px" cols={3}>
                  {ranking.map((vote, index) => (
                    <Stack key={vote.id} bg="white" p="md" justify="center">
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
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmitComment(vote);
                        }}
                      >
                        <Textarea
                          value={comments[vote.id] || ""}
                          mt="md"
                          onChange={(e) =>
                            handleChange(vote.id, e.currentTarget.value)
                          }
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
              <SimpleGrid bd="sm" spacing="40px" cols={4}>
                {applications.map((application) => (
                  <Flex key={application.id} direction="column">
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
