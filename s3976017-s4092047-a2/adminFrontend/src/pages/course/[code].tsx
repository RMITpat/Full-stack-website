import {
  Title,
  Button,
  Stack,
  Space,
  Group,
  Table,
  Modal,
} from "@mantine/core";

import { useRouter } from "next/router";
import { Course, Lecturer } from "@/interfaces/Interfaces";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "@mantine/charts/styles.css";
import { adminService } from "@/graphQLservices/api";
import { useLoginContext } from "@/components/contexts/LoginContext";
import { useDisclosure } from "@mantine/hooks";
import { ApolloError } from "@apollo/client";
export default function CourseDetail() {
  const router = useRouter();
  const { code } = router.query;
  const [course, setCourse] = useState<Course | null>(null);
  const { loggedIn } = useLoginContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedAssign, { open: openAssigning, close: closeAssigning }] =
    useDisclosure(false);
  const [notAssignedLecturers, setNotAssignedLecturers] = useState<Lecturer[]>(
    []
  );
  const [removingLecturers, setRemovingLecturers] = useState<boolean>(false);
  const [currentlecturer, setCurrentLecturer] = useState<Lecturer | null>(null);

  const fetchCourse = useCallback(async () => {
    try {
      const course = await adminService.getCourse(code as string);
      setCourse(course);
    } catch (error) {
      toast.error("Error fetching course");
      console.log(error);
    }
  }, [code]);

  useEffect(() => {
    if (code) {
      fetchCourse();
    }
  }, [code, fetchCourse]);
  useEffect(() => {
    const fetchLecturersNotInCourse = async () => {
      console.log("Fetched");
      try {
        if (course) {
          const lecturers = await adminService.getLecturersNotInCourse(
            course.id
          );
          setNotAssignedLecturers(lecturers);
        }
      } catch (error) {
        if (error instanceof ApolloError) {
          toast.error(error.message);
        } else {
          toast.error("Failed to fetch lecturers not in course");
        }
      }
    };
    fetchLecturersNotInCourse();
  }, [course]);

  const viewVotes = async (lecturer: Lecturer) => {
    open();
    console.log(lecturer);
    setCurrentLecturer(lecturer);
  };
  const handleRemoveLecturer = async (lecturer: Lecturer) => {
    try {
      console.log(lecturer);
      if (course) {
        await adminService.removeLecturer(course.id, lecturer.id);
      }
      toast.success(
        `Fired ${lecturer.firstName} ${lecturer.lastName} successfully!`
      );
      fetchCourse();
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.message);
      } else {
        toast.error("Failed to remove lecturer");
      }
    }
  };

  const addLecturer = async (lecturerId: number) => {
    try {
      if (course) {
        await adminService.addLecturerToCourse(course.id, lecturerId);
        toast.success("Successfully added lecturer");
        fetchCourse();
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.message);
      } else {
        toast.error("Failed to add lecturer");
      }
    }
  };

  const rows = course?.assigned_lecturers.map((lecturer) => (
    <Table.Tr key={lecturer.id}>
      {removingLecturers && (
        <Table.Td>
          <Button bg="red" onClick={() => handleRemoveLecturer(lecturer)}>
            Fire!
          </Button>
        </Table.Td>
      )}
      <Table.Td>{lecturer.firstName}</Table.Td>
      <Table.Td>{lecturer.lastName}</Table.Td>
      <Table.Td>{lecturer.email}</Table.Td>
      <Table.Td>{lecturer.password}</Table.Td>
      <Table.Td>{new Date(Number(lecturer.createdAt)).toDateString()}</Table.Td>
      <Table.Td>{new Date(Number(lecturer.updatedAt)).toDateString()}</Table.Td>
      <Table.Td>
        <Button onClick={() => viewVotes(lecturer)}>View votes</Button>
      </Table.Td>
    </Table.Tr>
  ));
  const notAssignedLecturerRows = notAssignedLecturers.map((lecturer) => (
    <Table.Tr key={lecturer.id}>
      <Table.Td>{lecturer.firstName}</Table.Td>
      <Table.Td>{lecturer.lastName}</Table.Td>
      <Table.Td>{lecturer.email}</Table.Td>
      <Table.Td>
        <Button onClick={() => addLecturer(lecturer.id)}>Add</Button>
      </Table.Td>
    </Table.Tr>
  ));
  const voteRows = (lecturer: Lecturer) => {
    const filteredVotes = lecturer.votes.filter(
      (vote) => vote.application.course.id === course?.id
    );
    return filteredVotes.map((vote) => (
      <Table.Tr key={vote.id}>
        <Table.Td>{`${vote.application.applicant.firstName} ${vote.application.applicant.lastName}`}</Table.Td>
        <Table.Td>{vote.application.type}</Table.Td>

        <Table.Td>{vote.ranking}</Table.Td>
        <Table.Td>{vote.comment}</Table.Td>
      </Table.Tr>
    ));
  };

  return (
    <>
      {course && loggedIn ? (
        <>
          <Group justify="space-between">
            <Title>{course.name + " - " + course.code}</Title>{" "}
            <Button mt="md" onClick={() => router.push("/")}>
              Back
            </Button>
          </Group>
          <Title order={2}>{course.semester}</Title>
          <Group mt={"md"}>
            <Button onClick={() => router.push(`/course/${code}/edit`)}>
              Edit course details
            </Button>
          </Group>

          <Stack>
            <Space w="lg"></Space>
            <Group justify="space-between">
              <Title order={2}>Course Lecturers</Title>
              <Group>
                <Button onClick={() => openAssigning()}>Add lecturers</Button>
                {removingLecturers ? (
                  <Button
                    onClick={() => setRemovingLecturers(!removingLecturers)}
                    bg="green"
                  >
                    Stop removing lecturers
                  </Button>
                ) : (
                  <Button
                    bg="red"
                    onClick={() => setRemovingLecturers(!removingLecturers)}
                  >
                    Remove lecturers
                  </Button>
                )}
              </Group>
            </Group>
            <Table.ScrollContainer minWidth={500}>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    {removingLecturers && <Table.Th></Table.Th>}
                    <Table.Th>First name</Table.Th>
                    <Table.Th>Last name</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Password</Table.Th>
                    <Table.Th>Created at</Table.Th>
                    <Table.Th>Updated at</Table.Th>
                    <Table.Th>Rankings</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Stack>
          <Modal
            opened={opened}
            onClose={close}
            title={`${currentlecturer?.firstName} ${currentlecturer?.lastName}'s rankings `}
          >
            {currentlecturer &&
            currentlecturer.votes &&
            currentlecturer.votes.length > 0 ? (
              <Table.ScrollContainer minWidth={100}>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Applicant</Table.Th>
                      <Table.Th>Type</Table.Th>
                      <Table.Th>Ranking</Table.Th>
                      <Table.Th>Comment</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{voteRows(currentlecturer)}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            ) : (
              <p> No votes casted</p>
            )}
          </Modal>
          <Modal
            size="70%"
            opened={openedAssign}
            onClose={closeAssigning}
            title={`Lecturers not in course`}
          >
            {notAssignedLecturers && (
              <Table.ScrollContainer minWidth={500}>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>First name</Table.Th>
                      <Table.Th>Last name</Table.Th>
                      <Table.Th>Email</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{notAssignedLecturerRows}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            )}
          </Modal>
        </>
      ) : (
        <p>undefined</p>
      )}
    </>
  );
}
