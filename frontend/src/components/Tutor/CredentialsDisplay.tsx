import { DetailValues } from "@/interfaces/Interfaces";
import { theme } from "@chakra-ui/react";
import { Stack, Title, Button, Text, Group, Image } from "@mantine/core";
import { useLoginContext } from "@/pages/contexts/LoginContext";
let detailArray: [string, keyof DetailValues][] = [
  ["Previous Roles", "previousRoles"],
  ["Availability", "availability"],
  ["Skills", "skills"],
  ["Credentials", "credentials"],
];
interface CredentialProps {
  currentTutor: DetailValues | undefined;
  open: () => void;
}
///used to display the credentials for a tutor in the tutor homepage
const CredentialsDisplay: React.FC<CredentialProps> = ({
  currentTutor,
  open,
}) => {
  const currentUser = useLoginContext();

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
          <Title order={2}>{currentUser.user.User_FirstName}</Title>
        </Stack>
        <Group justify="center">
          {" "}
          <Image
            w="50%"
            radius="md"
            src={`/images/${currentUser.user.User_FirstName.split(" ")[0]}.jpg`}
          />
        </Group>
        <Stack p="md">
          <Stack gap="0px">
            <Title order={4}>Previous Roles</Title>
            {currentTutor ? (
              <Text>{currentTutor.previousRoles}</Text>
            ) : (
              <Text>Not set</Text>
            )}
          </Stack>
          <Stack gap="0px">
            <Title order={4}>Availability</Title>
            {currentTutor ? (
              <Text>{currentTutor.availability}</Text>
            ) : (
              <Text>Not set</Text>
            )}
          </Stack>
          <Stack gap="0px">
            <Title order={4}>Skills</Title>
            {currentTutor ? (
              <Text>{currentTutor.skills}</Text>
            ) : (
              <Text>Not set</Text>
            )}
          </Stack>
          <Stack gap="0px">
            <Title order={4}>Credentials</Title>
            {currentTutor ? (
              <Text>{currentTutor.credentials}</Text>
            ) : (
              <Text>Not set</Text>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Button
        variant="filled"
        size="md"
        // style={{ width: "30%" }}
        onClick={open}
      >
        Update Details
      </Button>
    </Stack>
  );
};

export default CredentialsDisplay;
