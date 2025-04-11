import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import {User, ApplicationDetails} from "@/interfaces/Types";
import {ReactNode} from "react";

type AppliCardProps = {
    application: ApplicationDetails;
    username: string
};

export default function AppliCard({
    application,
    username,
    }:AppliCardProps) {
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
                <Text fw={500}>{username}</Text>
                <Badge color="pink">{application.Users_Credential.availability}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {application.Users_Credential.skills}
            </Text>

            <Text size="sm" c="dimmed">
                {application.Users_Credential.credentials}
            </Text>

            <Text size="sm" c="dimmed">
                {application.Users_Credential.previousRoles}
            </Text>

        </Card>
    );
}