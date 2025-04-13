import { DetailValues, IndCourse } from "@/interfaces/Interfaces";
import { UserCredential, User } from "@/interfaces/Types";
import { Card, Text, Title, Group, Badge, Stack, Button } from "@mantine/core";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { button } from "framer-motion/m";

type ApplicationProps = {
  applicant: DetailValues;
  index: number;
  buttonSetting: string;
  showNumber: string;
  moveLeft: (currentCourse: IndCourse, index: number) => void;
  moveRight: (currentCourse: IndCourse, index: number) => void;
  currentCourse: IndCourse;
};

export default function ApplicationCard({
  applicant,
  index,
  buttonSetting,
  showNumber,
  moveLeft,
  moveRight,
  currentCourse,
}: ApplicationProps) {
  return (
    <Card shadow="sm" withBorder>
      {showNumber == "numberOnly" ? (
        <Title order={3}>{index + 1}</Title>
      ) : showNumber == "showButtons" ? (
        <Group justify="space-between">
          <Button
            leftSection={<IconArrowNarrowLeft />}
            onClick={() => moveLeft(currentCourse, index)}
          ></Button>
          <Title order={3}>{index + 1}</Title>

          <Button
            rightSection={<IconArrowNarrowRight />}
            onClick={() => moveRight(currentCourse, index)}
          ></Button>
        </Group>
      ) : (
        <></>
      )}

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
    </Card>
  );
}
