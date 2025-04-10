import { DetailValues } from "@/interfaces/Interfaces";
import { UserCredential, User } from "@/interfaces/Types";
import { Card, Text, Title, Group, Badge, Stack, Button } from "@mantine/core";
import { button } from "framer-motion/m";

type ApplicationProps = {
  applicant: DetailValues;
  index: number;
  buttonSetting: string;
  showNumber: boolean;
};

export default function ApplicationCard({
  applicant,
  index,
  buttonSetting,
  showNumber,
}: ApplicationProps) {
  return (
    <Card shadow="sm" withBorder>
      {showNumber && <Title order={3}>{index + 1}</Title>}

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{applicant.name}</Text>
        <Badge>{applicant.availability}</Badge>
      </Group>
      <Stack gap="0px">
        <Text size="sm">Credentials</Text>
        <Text size="sm" c="dimmed">
          {applicant.credentials}
        </Text>

        <Text size="sm">Previous Roles</Text>

        <Text size="sm" c="dimmed">
          {applicant.previousRoles}
        </Text>
        <Text size="sm">Skills</Text>

        <Text size="sm" c="dimmed">
          {applicant.skills}
        </Text>
      </Stack>
      {/* {buttonSetting != "noButton" && <Button mt="md">{buttonSetting}</Button>} */}
    </Card>
  );
}
