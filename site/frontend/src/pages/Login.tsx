import {
  TextInput,
  Button,
  PasswordInput,
  Group,
  Flex,
  Stack,
  Tabs,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useLoginContext } from "@/contexts/LoginContext";
import { useRouter } from "next/router";
import { lecturerApi } from "@/services/lecturerApi";
import { applicantApi } from "@/services/applicantApi";
import { toast } from "react-toastify";
import { User } from "@/interfaces/Types";
import axios from "axios";

export default function Login() {
  const { setUser } = useLoginContext();
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const lecturerForm = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      //email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const applicantForm = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      //email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  //this authenticates a user signing in with the password
  // associated with the email they entered in the login form

  const [activeTab, setActiveTab] = useState<string | null>("applicant");
  const handleLogInApplicant = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      const user = await applicantApi.logInApplicant(values);
      const userObject: User = {
        User_id: user.id,
        User_Applications: user.Applications,
        User_Courses_Assigned_To: [],
        User_LastName: user.lastName,
        User_Votes: [],
        User_Email: user.email,
        User_FirstName: user.firstName,
        User_Type: "logged_in",
        User_Password: user.password,
        User_Date_Joined: user.createdAt,
        User_Updated_At: user.updatedAt,
        User_blocked: user.blocked,
      };

      setUser(userObject);
      router.push("/");
      toast.success("Applicant log in successful!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          setError("You are blocked from signing in");
        } else if (error.response?.status == 404) {
          setError("Email or password is incorrect");
        } else {
          setError("Unknown error");
        }
      } else {
        setError("Network error");
      }
    }
  };

  const handleLogInLecturer = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      const user = await lecturerApi.logInLecturer(values);
      const userObject: User = {
        User_id: user.id,
        User_Applications: [],
        User_Courses_Assigned_To: user.courses_assigned_to,
        User_LastName: user.lastName,
        User_Votes: user.votes,
        User_Email: user.email,
        User_FirstName: user.firstName,
        User_Type: "logged_in_lecturer",
        User_Password: user.password,
        User_Date_Joined: user.createdAt,
        User_Updated_At: user.updatedAt,
        User_blocked: user.blocked,
      };
      setUser(userObject);
      router.push("/");
      toast.success("Lecturer log in successful!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == 404) {
          setError("Email or password is incorrect");
        } else {
          setError("Unknown error");
        }
      } else {
        setError("Network error");
      }
    }
  };

  return (
    <>
      <>
        <Group justify="center">
          <Flex justify="stretch" align="center" direction="column" p="md">
            <Tabs value={activeTab} onChange={setActiveTab}>
              <Stack justify="space-between" p="md">
                <Tabs.List justify="center">
                  <Tabs.Tab value="applicant">Applicant</Tabs.Tab>
                  <Tabs.Tab value="lecturer">Lecturer</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="applicant">
                  <Title>Applicant Log In</Title>

                  <form onSubmit={applicantForm.onSubmit(handleLogInApplicant)}>
                    <Stack>
                      <TextInput
                        {...applicantForm.getInputProps("email")}
                        mt="md"
                        label="Email"
                        placeholder="Email"
                      />
                      <PasswordInput
                        {...applicantForm.getInputProps("password")}
                        mt="md"
                        label="Password"
                        placeholder="Password"
                      />
                      <Button type="submit" mt="md">
                        Log in
                      </Button>
                    </Stack>
                  </form>
                </Tabs.Panel>

                <Tabs.Panel value="lecturer">
                  <Title>Lecturer Log In</Title>
                  <form onSubmit={lecturerForm.onSubmit(handleLogInLecturer)}>
                    <Stack>
                      <TextInput
                        {...lecturerForm.getInputProps("email")}
                        mt="md"
                        label="Email"
                        placeholder="Email"
                      />
                      <PasswordInput
                        {...lecturerForm.getInputProps("password")}
                        mt="md"
                        label="Password"
                        placeholder="Password"
                      />
                      <Button type="submit" mt="md">
                        Log in
                      </Button>
                    </Stack>
                  </form>
                </Tabs.Panel>
              </Stack>
            </Tabs>
            <Text color="red">{error}</Text>
          </Flex>
        </Group>
      </>
    </>
  );
}
