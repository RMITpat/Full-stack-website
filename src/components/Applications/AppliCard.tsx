import {
  Card,
  Image,
  Text,
  Badge,
  Group,

} from "@mantine/core";
import { User, ApplicationDetails } from "@/interfaces/Types";


type AppliCardProps = {
  application: ApplicationDetails;
  username: string;
  courseCode: string;
};

export default function AppliCard({
  application,
  username,
  courseCode
}:
AppliCardProps) {

  return (
    <Card shadow="sm" padding={"lg"} radius="md" withBorder>
      <Text c="dimmed">ranking: {application.Avg_Ranking}</Text>
      <Text c="dimmed">times chosen: {application.Avg_Ranking}</Text>
      <Card padding="lg" radius="md">
        <Card.Section>
          <Image
            w="50%"
            radius="md"
            src={`/images/${username.split(" ")[0]}.jpg`}
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{username}</Text>
          <Text fw={500}>{courseCode}</Text>
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
    </Card>
  );
}
