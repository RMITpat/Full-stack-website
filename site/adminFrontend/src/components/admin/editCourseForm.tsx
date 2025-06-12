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

export default function EditCourseForm({ course }: { course: Course }) {
  const form = useForm<Course>({
    mode: "uncontrolled",
    initialValues: {
      id: course.id,
      code: course.code,
      name: course.name,
      semester: course.semester,
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
    console.log(course.id);
    try {
      await adminService.updateCourse(
        course.id,
        values.code,
        values.name,
        values.semester
      );
      console.log(values);
      toast.success("Course update successful!");
      router.push(`/course/${values.code}`);
    } catch (error) {
      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          toast.error(error.graphQLErrors[0].message);
        }
      } else {
        toast.error("Failed to update course");
      }
    }
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        {...form.getInputProps("name")}
        mt="md"
        label="Set new course name"
        placeholder={course.name}
      />
      <TextInput
        {...form.getInputProps("code")}
        mt="md"
        label="Set new course code"
        placeholder={course.code}
      />
      <Text size="sm" style={{ marginBottom: "3px", marginTop: "16px" }}>
        Change semester
      </Text>
      <SegmentedControl
        {...form.getInputProps("semester")}
        data={["Semester 1", "Semester 2"]}
        defaultValue={course.semester}
      ></SegmentedControl>

      <Group justify="center" mt="md">
        <Button type="submit">Update</Button>
      </Group>
    </form>
  );
}
