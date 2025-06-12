import { Application } from "@/interfaces/Interfaces";
import { Card, Text, Group, Badge, Stack, Modal } from "@mantine/core";
import { useState } from "react";

type ApplicationProps = {
  application: Application;
};
//the application card that is used for displaying rankings and selected applicants
export default function ApplicationCard({ application }: ApplicationProps) {
  /*
 user Validation:

 Comment cannot be empty 
 */

  const [opened, setOpened] = useState(false);

  return (
    <>
      <Card shadow="sm" withBorder h={280}>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>
            {application.applicant.firstName +
              " " +
              application.applicant.lastName}
          </Text>
          <Badge>{application.availability}</Badge>
        </Group>
        <Stack gap="0px">
          <Text size="sm">Type</Text>

          <Text size="sm" c="dimmed">
            {application.type}
          </Text>
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
        </Stack>
      </Card>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Lecturer Comments"
        centered
      ></Modal>
    </>
  );
}
