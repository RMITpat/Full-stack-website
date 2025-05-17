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
import { useEffect, useState } from "react";
import { applicantApi } from "@/services/applicantApi";
import { Applicant, Lecturer } from "@/interfaces/Interfaces";
import { lecturerApi } from "@/services/lecturerApi";
export default function SignUp() {
  const { setUser } = useLoginContext();
  //const router1 = useRouter();
  const [error, setError] = useState<string | null>(null);

  const lecturerForm = useForm({
    mode: "controlled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      courses_assigned_to: [],
      votes: [],
    },
    validate: {
      //email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const applicantForm = useForm({
    mode: "controlled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      applications: [],
    },
    validate: {
      //email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const [newApplicant, setNewApplicant] = useState<Applicant | null>(null);

  const handleCreateApplicant = async (values: Applicant) => {
    try {
      await applicantApi.createApplicant(values);
    } catch (err) {
      setError("Failed to create applicant");
    }
  };
  const printTable = () => {
    const applicants = applicantApi.getAllApplicants();
    console.log(applicants);
  };

  const handleCreateLecturer = async (values: Lecturer) => {
    
    try {
      await lecturerApi.createLecturer(values);
    } catch (err) {
      setError("Failed to create lecturer");
    }
  };
  const printLecturerTable = () => {
    const lecturers = lecturerApi.getAllLecturers();
    console.log(lecturers);
  };
  const [activeTab, setActiveTab] = useState<string | null>("applicant");

  return (
    <>
      <div className="text-red-500">{error}</div>
      <Button onClick={() => printTable()}>log applicants table</Button>
      <Button onClick={() => printLecturerTable()}>log lecturers table</Button>

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
