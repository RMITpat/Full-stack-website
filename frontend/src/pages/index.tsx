import { useLoginContext } from "./contexts/LoginContext";

import TutorHomePage from "../components/tutorHomePage";
import LecturerHomePage from "../components/lecturerHomePage";

import { SetStateAction, useEffect, useState } from "react";
import { Course } from "../interfaces/Interfaces";
import { Card, Flex, Group, Stack, Text, Title } from "@mantine/core";
import UpdateApplication from "@/api/UpdateApplications";
import updateApplication from "@/api/UpdateApplications";
import { LecturerStateProvider } from "@/pages/contexts/LecturerState";

export default function Home() {
  const currentUser = useLoginContext();
  let defaultCourses: Course[] = [
    {
      name: "Full Stack Development",
      courseCode: "COSC1048",
      semester: "Semester 1",
      assigned_lecturers: [],
     
    },
    {
      name: "Cloud Computing",
      courseCode: "COSC4839",
      semester: "Semester 2",
      assigned_lecturers: [],
     
    },
    {
      name: "Programming Bootcamp",
      courseCode: "COSC4830",
      semester: "Semester 1",
      assigned_lecturers: [],
     
    },
  ];

  const [courses, setCourses] = useState<Course[]>(defaultCourses);
  // useEffect(() => {
  //   const lastCourseState = localStorage.getItem("courseDetails");
  //   if (lastCourseState) {
  //     console.log("lastcoursestate was" + JSON.parse(lastCourseState));
  //     setCourses(JSON.parse(lastCourseState));
  //   } else {
  //     localStorage.setItem("courseDetails", JSON.stringify(defaultCourses));
  //   }
  //   for (const course of defaultCourses) {
  //     console.log("updateApplication", course.name);
  //     updateApplication(course);
  //   }
  // }, []);
  const renderHomePage = () => {
    const userType = currentUser.user.User_Type;

    if (userType === "default") {
      return (
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
      );
    }

    if (userType === "logged_in_lecturer") {
      return <LecturerHomePage courses={courses} setCourses={setCourses} />;
    }

    if (userType === "logged_in" || userType === "admin_default") {
      return <TutorHomePage courses={courses} setCourses={setCourses} />;
    }

    return <p>Unknown status</p>;
  };
  //uses the login context, which provides context to all pages on who is currently logged in, to determine which  home page to show
  return <LecturerStateProvider>{renderHomePage()}</LecturerStateProvider>;
}
