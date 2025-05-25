import { Applicant, Application, Course, DetailValues, IndCourse } from "@/interfaces/Interfaces";
import { useLoginContext } from "@/pages/contexts/LoginContext";
import {
  Card,
  Text,
  Title,
  Group,
  Badge,
  Stack,
  Button,
  TextInput,
  Textarea,
  Modal,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useState } from "react";

type ApplicationProps = {
  application: Application;
  index: number;
  buttonSetting: string;
  showNumber: string;
  moveLeft: ( index: number) => void;
  moveRight: ( index: number) => void;
  avg: number;
};
//the application card that is used for displaying rankings and selected applicants
export default function ApplicationCard({
  application,
  index,
  buttonSetting,
  showNumber,
  moveLeft,
  moveRight,
  avg,
}: ApplicationProps) {
  const currentUser = useLoginContext();
  /*
 user Validation:

 Comment cannot be empty 
 */
  // const form = useForm({
  //   mode: "uncontrolled",
  //   initialValues: {
  //     comment: "",
  //   },

  //   validate: {
  //     comment: (value) =>
  //       value.trim().length > 0 ? null : "Comment cannot be empty",
  //   },
  // });
  const [opened, setOpened] = useState(false);
  const [currApplicantion, setCurrApplicantion] = useState<Application | undefined>(
    undefined
  );
  const openModal = (application: Application) => {
    setOpened(true);
    setCurrApplicantion(application);
  };
  // const handleSubmit = (values: typeof form.values) => {
  //   const appAndCommentArray =
  //     currentCourse.lecturerRankings[currentUser.user.User_Email];
  //   for (let i = 0; i < appAndCommentArray.length; ++i) {
  //     if (appAndCommentArray[i].applicant.email == applicant.email) {
  //       appAndCommentArray[i].comment = values.comment;
  //     }
  //   }
  // };

  // const lastComment = (applicant: DetailValues) => {
  //   if (currentCourse.lecturerRankings[currentUser.user.User_Email]) {
  //     for (
  //       let i = 0;
  //       i < currentCourse.lecturerRankings[currentUser.user.User_Email].length;
  //       ++i
  //     ) {
  //       if (
  //         currentCourse.lecturerRankings[currentUser.user.User_Email][i]
  //           .applicant.email == applicant.email
  //       ) {
  //         return currentCourse.lecturerRankings[currentUser.user.User_Email][i]
  //           .comment;
  //       }
  //     }
  //   }
  // };
  return (
    <>
      <Card shadow="sm" withBorder>
        {showNumber == "numberOnly" ? (
          <>
            <Title order={3}>{index + 1}</Title>
            <Title order={3}>Avg Rank: {avg.toFixed(2)}</Title>
          </>
        ) : showNumber == "showButtons" ? (
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
        ) : (
          <></>
        )}
       

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{application.applicant.firstName + " " + application.applicant.lastName}</Text>
          <Badge>{application.availability}</Badge>
        </Group>
        <Stack gap="0px">
          <Text size="sm">Credentials</Text>
          <Text size="sm" c="dimmed">
            {application.credentials}
          </Text>

          <Text size="sm">Previous Roles</Text>

          <Text size="sm" c="dimmed">
            {application.previousRoles}
          </Text>
          <Text size="sm">Skills</Text>

          <Text size="sm" c="dimmed">
            {application.skills}
          </Text>
          {showNumber == "numberOnly" ? (
            <Button onClick={() => openModal(application)}>Comments</Button>
          ) : showNumber == "showButtons" ? (
            // <form onSubmit={form.onSubmit(handleSubmit)}>
            //   <Textarea
            //     {...form.getInputProps("comment")}
            //     mt="md"
            //     label="Comment"
            //     placeholder= "last comment"//{lastComment(applicant)}
            //     autosize
            //   />
              <></>
            //   <Group justify="center" mt="md">
            //     <Button type="submit">Add Comment</Button>
            //   </Group>
            // </form>
          ) : (
            <></>
          )}
        </Stack>
      </Card>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Lecturer Comments"
        centered
      >
        {/* {applicant.lecturerComments.map((comment, index) => (
          <Stack>
            <Title order={5}>{comment.email}</Title>
            {comment.comment == "" ? (
              <Text>No Comment</Text>
            ) : (
              <Text>{comment.comment}</Text>
            )}
          </Stack>
        ))} */}
      </Modal>
    </>
  );
}
