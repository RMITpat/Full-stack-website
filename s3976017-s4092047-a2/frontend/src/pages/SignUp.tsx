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
import { useLoginContext } from "@/contexts/LoginContext";
import { useState } from "react";
import { applicantApi } from "@/services/applicantApi";
import { Applicant, Lecturer } from "@/interfaces/Interfaces";
import { lecturerApi } from "@/services/lecturerApi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { User } from "@/interfaces/Types";
import { AxiosError } from "axios";
import { PasswordStrength } from "@/components/signup/PasswordStrInput";
/*
sign ups are validated in both the front end and backend as evidenced in applicant-signup.dto.ts and lecturer-signup.dto.ts
however since the form validation prevents submission, the backend validation errors dont appear
*/

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
      confirmPassword: "",
      courses_assigned_to: [],
      votes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    validate: (values) => ({
      firstName:
        values.firstName.length < 2
          ? "First name must have at least 2 letters"
          : null,
      lastName:
        values.lastName.length < 2
          ? "Last name must have at least 2 letters"
          : null,
      email: /^\S+@\S+\.\S+$/.test(values.email)
        ? null
        : "Invalid email. Must follow the format x@x.xxx",
      password:
        values.password.length < 6 || values.password.length > 20
          ? "Password must be between 6 and 20 characters"
          : null,
      confirmPassword:
        values.confirmPassword !== values.password
          ? "Passwords do not match"
          : null,
    }),
  });

  const applicantForm = useForm({
    mode: "controlled",
    initialValues: {
      id: -1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      applications: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      blocked: false,
    },
    validate: (values) => ({
      firstName:
        values.firstName.length < 2
          ? "First name must have at least 2 letters"
          : null,
      lastName:
        values.lastName.length < 2
          ? "Last name must have at least 2 letters"
          : null,
      email: /^\S+@\S+\.\S+$/.test(values.email)
        ? null
        : "Invalid email. Must follow the format x@x.xxx",
      password:
        values.password.length < 6 || values.password.length > 20
          ? "Password must be between 6 and 20 characters"
          : null,
      confirmPassword:
        values.confirmPassword !== values.password
          ? "Passwords do not match"
          : null,
    }),
  });

  //this weird pattern is to get around using a controlled form,
  //and passing the input to the child component,
  //there was a bug where you would type and it would appear in both
  const applicantPasswordField = (
    <PasswordStrength
      value={applicantForm.values.password}
      onChange={(event) =>
        applicantForm.setFieldValue("password", event.currentTarget.value)
      }
      mt="md"
      label="Password"
      placeholder="Password"
    />
  );

  const applicantConfirmPasswordField = (
    <PasswordInput
      value={applicantForm.values.confirmPassword}
      onChange={(event) =>
        applicantForm.setFieldValue(
          "confirmPassword",
          event.currentTarget.value
        )
      }
      mt="md"
      label="Confirm Password"
      placeholder="Re-enter password"
      error={applicantForm.errors.confirmPassword}
    />
  );
  const lecturerPasswordField = (
    <PasswordStrength
      value={lecturerForm.values.password}
      onChange={(event) =>
        lecturerForm.setFieldValue("password", event.currentTarget.value)
      }
      mt="md"
      label="Password"
      placeholder="Password"
    />
  );

  const lecturerConfirmPasswordField = (
    <PasswordInput
      value={lecturerForm.values.confirmPassword}
      onChange={(event) =>
        lecturerForm.setFieldValue("confirmPassword", event.currentTarget.value)
      }
      mt="md"
      label="Confirm Password"
      placeholder="Re-enter password"
      error={lecturerForm.errors.confirmPassword}
    />
  );

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
        User_blocked: user.blocked,
      };
      setUser(userObject);
      router.push("/");
      toast.success("Applicant account successfully created!");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError("Backend input validation failed for one or more fields");
      } else {
        setError("Failed to create applicant");
      }
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
        User_blocked: user.blocked,
      };
      setUser(userObject);
      router.push("/");
      toast.success("Lecturer account successfully created!");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError("Backend input validation failed for one or more fields");
      } else {
        setError("Failed to create applicant");
      }
    }
  };

  const [activeTab, setActiveTab] = useState<string | null>("applicant");

  return (
    <>
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
                      type="email"
                    />
                    {applicantPasswordField}
                    {applicantConfirmPasswordField}
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
                    {lecturerPasswordField}
                    {lecturerConfirmPasswordField}
                    <Button type="submit" mt="md">
                      Create Account
                    </Button>
                  </Stack>
                </form>
              </Tabs.Panel>
              <div className="text-red-500">{error}</div>
            </Stack>
          </Tabs>
        </Flex>
      </Group>
    </>
  );
}
