import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import {Application} from "@/interfaces/Types";

type AppliCardProps = {
    app: Application;
};

export default function AppliCard({ app }: AppliCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{app.name}</Text>
                <Badge color="pink">{app.availability}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {app.course}
            </Text>

            <Text size="sm" c="dimmed">
                {app.skills}
            </Text>

            <Text size="sm" c="dimmed">
                {app.credentials}
            </Text>

            <Text size="sm" c="dimmed">
                {app.previousRoles}
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
            </Button>
        </Card>
    );
}