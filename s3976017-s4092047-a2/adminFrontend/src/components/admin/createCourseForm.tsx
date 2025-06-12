import { adminService } from "@/graphQLservices/api";
import { Course } from "@/interfaces/Interfaces";
import { ApolloError } from "@apollo/client";
import {
  Button,
  Group,
  SegmentedControl,
  TextInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import router from "next/router";
import { toast } from "react-toastify";

export default function CreateCourseForm() {
  const form = useForm<Course>({
    mode: "uncontrolled",
    initialValues: {
      id: -1,
      code: "",
      name: "",
      semester: "",
      assigned_lecturers: [],
    },

    validate: {
      //   previousRoles: (value) =>
      //     value.trim().length > 0 ? null : "Previous Roles are required",
      //   skills: (value) =>
      //     value.trim().length > 0 ? null : "Skills are required",
      //   credentials: (value) =>
      //     value.trim().length > 0 ? null : "Credentials are required",
    },
  });
  const handleSubmit = async (values: {
    name: string;
    semester: string;
    code: string;
  }) => {
    //update courses applications
    try {
      await adminService.createCourse(
        values.name,
        values.code,
        values.semester
      );
      console.log(values);
      toast.success("Course creation successful!");
      router.push("/");
    } catch (error) {
      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          toast.error(error.graphQLErrors[0].message);
        }
      } else {
        toast.error("Failed to create course");
      }
    }
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        {...form.getInputProps("name")}
        mt="md"
        label="Course name"
        placeholder="Course name"
        required
      />
      <TextInput
        {...form.getInputProps("code")}
        mt="md"
        label="Course code"
        placeholder="Course code"
        required
      />
      <Text size="sm" style={{ marginBottom: "3px", marginTop: "16px" }}>
        Semester
      </Text>
      <SegmentedControl
        {...form.getInputProps("semester")}
        data={["Semester 1", "Semester 2"]}
      ></SegmentedControl>

      <Group justify="center" mt="md">
        <Button type="submit">Create</Button>
      </Group>
    </form>
  );
}
