import Link from "next/link";
import React from "react";
import { Stack } from '@mantine/core'

export default function NavBar() {

    return (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="md">

            <Link href = "/registration" passHref>
                Login
            </Link>

            <Link href = "/" passHref>
                TeachTeam
            </Link>
        </Stack>

    );

}