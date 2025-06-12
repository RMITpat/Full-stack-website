import Link from "next/link";
import React from "react";
import { Stack, Button } from "@mantine/core";
import { useLoginContext } from "@/components/contexts/LoginContext";

export default function NavBar() {
  const { loggedIn, setLoggedIn } = useLoginContext();

  const signOut = () => {
    setLoggedIn(false);
  };

  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="center"
      gap="md"
    >
      {!loggedIn ? (
        <Button mt={"sm"} component={Link} href="/Login">
          Login
        </Button>
      ) : (
        <Button
          onClick={() => signOut()}
          mt={"sm"}
          component={Link}
          href="/Login"
        >
          Sign out
        </Button>
      )}

      <Button mt={"sm"} component={Link} href="/">
        Admin Home
      </Button>
    </Stack>
  );
}
