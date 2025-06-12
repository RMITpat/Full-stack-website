import { Button, Group, Stack, Title } from "@mantine/core";
import { useLoginContext } from "../components/contexts/LoginContext";
import NotLoggedIn from "@/components/admin/notLoggedIn";
import CreateCourseForm from "@/components/admin/createCourseForm";
import router from "next/router";
export default function CreateCourse() {
  const loginContext = useLoginContext();

  return (
    <>
      {loginContext.loggedIn ? (
        <>
          <Group justify="space-between">
            <Title>Create a new course</Title>
            <Button size="sm" onClick={() => router.push("/")}>
              Back
            </Button>
          </Group>

          <Stack>
            <CreateCourseForm></CreateCourseForm>
          </Stack>
        </>
      ) : (
        <NotLoggedIn></NotLoggedIn>
      )}
    </>
  );
}
