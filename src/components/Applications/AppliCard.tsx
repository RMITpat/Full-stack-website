import { Card, Image, Text, Badge, Button, Group, Stack } from "@mantine/core";
import { User, ApplicationDetails } from "@/interfaces/Types";
import { useContext } from "react";
import { useLecturerState } from "@/pages/contexts/LecturerState"; // adjust path as needed

type AppliCardProps = {
  application: ApplicationDetails;
  username: string;
  //onSelect?: () => void; // optional select callback
};

export default function AppliCard({
  application,
  username,
}: //onSelect,
AppliCardProps) {
  //const { lecturerState } = useLecturerState();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Group justify="center">
          {" "}
          <Image
            w="50%"
            radius="md"
            src={`/images/${username.split(" ")[0]}.jpg`}
          />
        </Group>
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{username}</Text>
        <Badge>{application.Users_Credential.availability}</Badge>
      </Group>

      <Stack gap="0px">
        <Text size="sm">Credentials</Text>
        <Text size="sm" c="dimmed">
          {application.Users_Credential.credentials}
        </Text>

        <Text size="sm">Previous Roles</Text>

        <Text size="sm" c="dimmed">
          {application.Users_Credential.previousRoles}
        </Text>
        <Text size="sm">Skills</Text>

        <Text size="sm" c="dimmed">
          {application.Users_Credential.skills}
        </Text>
      </Stack>
    </Card>
  );
}
