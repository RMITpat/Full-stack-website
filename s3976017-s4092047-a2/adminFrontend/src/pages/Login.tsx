import {
  TextInput,
  Button,
  PasswordInput,
  Group,
  Flex,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useLoginContext } from "../components/contexts/LoginContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { adminService } from "@/graphQLservices/api";
import { ApolloError } from "@apollo/client";

export default function Login() {
  const { setLoggedIn } = useLoginContext();
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const adminForm = useForm({
    mode: "controlled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: {},
  });

  //this authenticates a user signing in with the password
  // associated with the username they entered in the login form

  const handleLogInAdmin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await adminService.getAdmin(values.username, values.password);
      setLoggedIn(true);
      router.push("/");
      toast.success("Admin log in successful!");
    } catch (error) {
      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          setError(error.graphQLErrors[0].message);
        }
      } else {
        setError("Failed to log in");
      }
    }
  };

  return (
    <>
      <>
        <Group justify="center">
          <Flex justify="stretch" align="center" direction="column" p="md">
            <Stack justify="space-between" p="md">
              <Title>Admin Log In</Title>

              <form onSubmit={adminForm.onSubmit(handleLogInAdmin)}>
                <Stack>
                  <TextInput
                    {...adminForm.getInputProps("username")}
                    mt="md"
                    label="Username"
                    placeholder="Username"
                  />
                  <PasswordInput
                    {...adminForm.getInputProps("password")}
                    mt="md"
                    label="Password"
                    placeholder="Password"
                  />
                  <Button type="submit" mt="md">
                    Log in
                  </Button>
                </Stack>
              </form>
            </Stack>
            <Text c="red">{error}</Text>
          </Flex>
        </Group>
      </>
    </>
  );
}
