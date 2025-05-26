import { useLoginContext } from "./contexts/LoginContext";

import TutorHomePage from "../components/tutorHomePage";
import LecturerHomePage from "../components/lecturerHomePage";

import { useState } from "react";
import { Course } from "../interfaces/Interfaces";
import {  Flex, Stack, Text, Title } from "@mantine/core";


export default function Home() {
  const currentUser = useLoginContext();
  let defaultCourses: Course[] = [
    {
      name: "Full Stack Development",
      code: "COSC1048",
      semester: "Semester 1",
      assigned_lecturers: [],
    },
    {
      name: "Cloud Computing",
      code: "COSC4839",
      semester: "Semester 2",
      assigned_lecturers: [],
    },
    {
      name: "Programming Bootcamp",
      code: "COSC4830",
      semester: "Semester 1",
      assigned_lecturers: [],
    },
  ];

  const [courses, setCourses] = useState<Course[]>(defaultCourses);
  const userType = currentUser.user.User_Type;

  return (
    <>
      {userType === "default" ? (
        <Flex direction="column" align="center">
          <Stack>
            <Title>Welcome to TeachTeam!</Title>
          </Stack>
          <Text size="xl">
            Lead courses as a lecturer, help students as a tutor or aid staff as
            a lab assistant.
          </Text>
          <Text size="xl">Apply today!</Text>
        </Flex>
      ) : userType === "logged_in_lecturer" ? (
        <LecturerHomePage />
      ) : userType === "logged_in" || userType === "admin_default" ? (
        <TutorHomePage courses={courses} setCourses={setCourses} />
      ) : (
        <p>Unknown status</p>
      )}
    </>
  );
}
