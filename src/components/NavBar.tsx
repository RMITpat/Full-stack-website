import Link from "next/link";
import React from "react";
import { Stack, Button} from '@mantine/core'


export default function NavBar() {

    return (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="md">
            <Button mt={"sm"}>
                <Link href = "/Login" passHref>
                    Login
                </Link>
            </Button>
            <Button mt={"sm"}>
                <Link href = "/" passHref>
                    TeachTeam
                </Link>
            </Button>
        </Stack>

    );

}