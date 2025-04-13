import { DetailValues } from "@/interfaces/Interfaces";
import { theme } from "@chakra-ui/react";
import { Stack, Title, Button, Text } from "@mantine/core";

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

const CredentialsDisplay: React.FC<CredentialProps> = ({
  currentTutor,
  open,
}) => {
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
          <Title order={2}>Your Details</Title>
        </Stack>
        <Stack p="md">
          {detailArray.map((field, index) => (
            <Stack gap="0px">
              <Title order={4} key={index}>
                {field[0]}
              </Title>
              {currentTutor ? (
                <Text>{currentTutor[field[1]]}</Text>
              ) : (
                <Text>Not set</Text>
              )}
            </Stack>
          ))}
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
