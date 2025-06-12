import { Card, Text, Badge, Group, Title, Stack } from "@mantine/core";
import { ApplicationDetails } from "@/interfaces/Types";

type AppliCardProps = {
  application: ApplicationDetails;
  username: string;
  courseCode: string;
  courseName: string;
};

export default function AppliCard({
  application,
  username,
  courseCode,
  courseName,
}: AppliCardProps) {
  return (
    <Stack p="md" >
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={3}>Applied for </Title>
        <Title order={3}>{courseName}</Title>
        <Title order={4}>{courseCode}</Title>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{username}</Text>
          <Badge color="pink">
            {application.Users_Credential.availability}
          </Badge>
        </Group>

        <Card.Section inheritPadding>
          <Text size="sm">Skills</Text>
          <Text size="sm" c="dimmed">
            {application.Users_Credential.skills}
          </Text>

          <Text size="sm">Credentials</Text>
          <Text size="sm" c="dimmed">
            {application.Users_Credential.credentials}
          </Text>

          <Text size="sm">Previous Roles</Text>
          <Text size="sm" c="dimmed">
            {application.Users_Credential.previousRoles}
          </Text>
        </Card.Section>
      </Card>
    </Stack>
  );
}
