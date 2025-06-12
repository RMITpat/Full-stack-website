import { Stack, Title, Text } from "@mantine/core";
import { User } from "@/interfaces/Types";

interface CredentialProps {
  currentTutor: User | undefined;
}
///used to display the credentials for a tutor in the tutor homepage
const CredentialsDisplay: React.FC<CredentialProps> = ({ currentTutor }) => {
  return (
    <Stack>
      <Stack
        justify="center"
        align="stretch"
        style={{
          border: "1px solid black",
        }}
      >
        <Stack p="sm" bg="gray">
          <Title order={2}>Profile</Title>
        </Stack>
        <Stack p="md">
          <Stack gap="0px">
            <Title order={4}>First name</Title>
            {currentTutor ? (
              <Text>{currentTutor.User_FirstName}</Text>
            ) : (
              <Text>Not set</Text>
            )}
          </Stack>
          <Stack gap="0px">
            <Title order={4}>Last name</Title>
            {currentTutor ? (
              <Text>{currentTutor.User_LastName}</Text>
            ) : (
              <Text>Not set</Text>
            )}
          </Stack>
          <Stack gap="0px">
            <Title order={4}>Email</Title>
            {currentTutor ? (
              <Text>{currentTutor.User_Email}</Text>
            ) : (
              <Text>Not set</Text>
            )}
          </Stack>
          <Stack gap="0px">
            <Title order={4}>Password</Title>
            {currentTutor ? (
              <p style={{ wordBreak: "break-word" }}>
                {currentTutor.User_Password}
              </p>
            ) : (
              <Text>Not set</Text>
            )}
          </Stack>

          <Stack gap="0px">
            <Title order={4}>Join date</Title>
            {currentTutor ? (
              <Text>
                {new Date(currentTutor.User_Date_Joined).toDateString()}
              </Text>
            ) : (
              <Text>Not set</Text>
            )}
          </Stack>
        </Stack>
      </Stack>
      {/* <Button
        variant="filled"
        size="md"
        // style={{ width: "30%" }}
        onClick={open}
      >
        Update Details
      </Button> */}
    </Stack>
  );
};

export default CredentialsDisplay;
