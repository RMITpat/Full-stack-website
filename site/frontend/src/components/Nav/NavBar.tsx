import Link from "next/link";
import React from "react";
import { Stack, Button } from "@mantine/core";
import { useLoginContext } from "@/contexts/LoginContext";
import { User } from "@/interfaces/Types";

export default function NavBar() {
  const currentUser = useLoginContext();
  const setUser = currentUser.setUser;

  const signOut = () => {
    const signedOut: User = {
      User_id: -1,
      User_Applications: [],
      User_Courses_Assigned_To: [],
      User_LastName: "",
      User_Votes: [],
      User_Email: "",
      User_FirstName: "",
      User_Type: "default",
      User_Password: "",
      User_Date_Joined: new Date(),
      User_Updated_At: new Date(),
      User_blocked: false,
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
      <Button mt={"sm"} component={Link} href="/SignUp">
        Sign Up
      </Button>

      <Button mt={"sm"} component={Link} href="/">
        TeachTeam
      </Button>
    </Stack>
  );
}
