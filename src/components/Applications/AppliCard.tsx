import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import {UserCredential, User} from "@/interfaces/Types";

type AppliCardProps = {
    creds: UserCredential;
    user: User
};

export default function AppliCard({ creds, user}: AppliCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder >
            <Card.Section>
                <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{user.User_Name}</Text>
                <Badge color="pink">{creds.availability}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {creds.skills}
            </Text>

            <Text size="sm" c="dimmed">
                {creds.credentials}
            </Text>

            <Text size="sm" c="dimmed">
                {creds.previousRoles}
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
            </Button>
        </Card>
    );
}