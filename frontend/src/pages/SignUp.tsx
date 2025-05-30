import {
  TextInput,
  Button,
  PasswordInput,
  Title,
  Group,
  Flex,
  Stack,
  Tabs,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLoginContext } from "@/pages/contexts/LoginContext";
import { useState } from "react";
import { applicantApi } from "@/services/applicantApi";
import { Applicant, Lecturer } from "@/interfaces/Interfaces";
import { lecturerApi } from "@/services/lecturerApi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { User } from "@/interfaces/Types";

export default function SignUp() {
  const router = useRouter();
  const { setUser } = useLoginContext();
  //const router1 = useRouter();
  const [error, setError] = useState<string | null>(null);

  const lecturerForm = useForm({
    mode: "controlled",
    initialValues: {
      id: -1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      courses_assigned_to: [],
      votes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    validate: {
      //email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const applicantForm = useForm({
    mode: "controlled",
    initialValues: {
      id: -1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      applications: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    validate: {
      //email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });


  const handleCreateApplicant = async (values: Applicant) => {
    try {
      const user = await applicantApi.createApplicant(values);
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
      };
      setUser(userObject);
      router.push("/");
      toast.success("Applicant account successfully created!");
    } catch {
      setError("Failed to create applicant");
    }
  };

  const handleCreateLecturer = async (values: Lecturer) => {
    try {
      const user = await lecturerApi.createLecturer(values);
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
      };
      setUser(userObject);
      router.push("/");
      toast.success("Lecturer account successfully created!");
    } catch  {
      setError("Failed to create lecturer");
    }
  };

  const [activeTab, setActiveTab] = useState<string | null>("applicant");

  return (
    <>
      <div className="text-red-500">{error}</div>

      <Group justify="center">
        <Flex justify="stretch" align="stretch" direction="column" p="md">
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Stack justify="space-between" p="md">
              <Tabs.List justify="center">
                <Tabs.Tab value="applicant">Applicant</Tabs.Tab>
                <Tabs.Tab value="lecturer">Lecturer</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="applicant">
                <Title>Applicant Sign Up</Title>

                <form onSubmit={applicantForm.onSubmit(handleCreateApplicant)}>
                  <Stack>
                    <TextInput
                      {...applicantForm.getInputProps("firstName")}
                      mt="md"
                      label="First name"
                      placeholder="First Name"
                    />
                    <TextInput
                      {...applicantForm.getInputProps("lastName")}
                      mt="md"
                      label="Last name"
                      placeholder="Last Name"
                    />
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
                      Create Account
                    </Button>
                  </Stack>
                </form>
              </Tabs.Panel>

              <Tabs.Panel value="lecturer">
                <Title>Lecturer Sign Up</Title>
                <form onSubmit={lecturerForm.onSubmit(handleCreateLecturer)}>
                  <Stack>
                    <TextInput
                      {...lecturerForm.getInputProps("firstName")}
                      mt="md"
                      label="First name"
                      placeholder="First Name"
                    />
                    <TextInput
                      {...lecturerForm.getInputProps("lastName")}
                      mt="md"
                      label="Last name"
                      placeholder="Last Name"
                    />
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
                      Create Account
                    </Button>
                  </Stack>
                </form>
              </Tabs.Panel>
            </Stack>
          </Tabs>
        </Flex>
      </Group>
    </>
  );
}
