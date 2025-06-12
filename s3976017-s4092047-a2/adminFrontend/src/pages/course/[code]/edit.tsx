import { Button, Group, Stack, Title, Text, Modal } from "@mantine/core";
import { useLoginContext } from "@/components/contexts/LoginContext";
import NotLoggedIn from "@/components/admin/notLoggedIn";
import { useRouter } from "next/router";
import { adminService } from "@/graphQLservices/api";
import { Course } from "@/interfaces/Interfaces";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import EditCourseForm from "@/components/admin/editCourseForm";
import { useDisclosure } from "@mantine/hooks";
export default function EditCourse() {
  const loginContext = useLoginContext();
  const router = useRouter();
  const { code } = router.query;
  const [course, setCourse] = useState<Course | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await adminService.getCourse(code as string);
        console.log(code);
        setCourse(course);
      } catch {
        toast.error("Error fetching course");
      }
    };
    if (code) {
      fetchCourse();
    }
  }, [code]);

  const deleteCourse = async () => {
    try {
      if (course) {
        await adminService.deleteCourse(course.id);
        toast.success("Course deleted");
        router.push("/");
      }
    } catch (error) {
      toast.error("Failed to delete course");
      console.log(error);
    }
  };
  return (
    <>
      {loginContext.loggedIn ? (
        <>
          <Group justify="space-between">
            <Title>Edit {course?.name}</Title>
            <Button size="sm" onClick={() => router.push(`/course/${code}`)}>
              Back
            </Button>
          </Group>

          <Stack>
            {course ? (
              <EditCourseForm course={course as Course} />
            ) : (
              <Text>Loading course</Text>
            )}
          </Stack>
          <Group justify="flex-start">
            <Button bg="red" onClick={() => open()}>
              Delete Course
            </Button>
          </Group>
          <Modal
            opened={opened}
            onClose={close}
            title={"Are you sure you want to delete this course?"}
          >
            <Group justify="center">
              <Button mt="lg" bg="red" onClick={() => deleteCourse()}>
                Delete Course
              </Button>
            </Group>
          </Modal>
        </>
      ) : (
        <NotLoggedIn></NotLoggedIn>
      )}
    </>
  );
}
