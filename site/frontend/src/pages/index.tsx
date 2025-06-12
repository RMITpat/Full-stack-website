import { useLoginContext } from "../contexts/LoginContext";
import TutorHomePage from "../components/tutorHomePage";
import LecturerHomePage from "../components/lecturerHomePage";

import { Flex, Stack, Text, Title } from "@mantine/core";

export default function Home() {
  const currentUser = useLoginContext();

  const userType = currentUser.user.User_Type;

  return (
    <>
      {userType === "default" ? (
        <Flex direction="column" align="center">
          <Stack>
            <Title>Welcome to TeachTeam!</Title>
          </Stack>
          <Text size="xl">
            Lead courses as a lecturer, help students as a tutor or aid staff as
            a lab assistant.
          </Text>
          <Text size="xl">Apply today!</Text>
        </Flex>
      ) : userType === "logged_in_lecturer" ? (
        <LecturerHomePage />
      ) : userType === "logged_in" || userType === "admin_default" ? (
        <TutorHomePage />
      ) : (
        <p>Unknown status</p>
      )}
    </>
  );
}
