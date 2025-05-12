import Link from "next/link";
import React from "react";
import { Stack, Button } from "@mantine/core";
import { useLoginContext } from "@/pages/contexts/LoginContext";
import { User } from "@/interfaces/Types";

export default function NavBar() {
  const currentUser = useLoginContext();
  const setUser = currentUser.setUser;

  const signOut = () => {
    const signedOut: User = {
      User_Password: "",
      User_Name: "",
      User_Email: "",
      User_Type: "default",
      User_Img_Url: "",
    };

    setUser(signedOut);
  };

  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="center"
      gap="md"
    >
      <Button mt={"sm"} component={Link} href="/signUp">
        Sign Up
      </Button>
      {currentUser.user.User_Type == "default" ? (
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
        TeachTeam
      </Button>
    </Stack>
  );
}
