import { useLoginContext } from "./contexts/LoginContext";

import TutorHomePage from "../components/tutorHomePage";
import LecturerHomePage from "../components/lecturerHomePage";

import { SetStateAction, useEffect, useState } from "react";
import { Course } from "@/interfaces/Interfaces"
import {Application, Tutor} from "../interfaces/Types"

function getTutorsFromDummyData(dummy: Record<string, any>): Tutor[] {
  return Object.entries(dummy)
      .filter(([_, user]) => user.type === "tutor")
      .map(([email, user]) => ({
        email,
        name: user.name,
      }));
}
export default function Home() {
  const currentUser = useLoginContext();

  let defaultCourses: Course[] = [
    {
      name: "Sigma 101",
      courseCode: "COSC1048",
      semester: "Semester 1",
      applicants: [
        "evelynjackson189@domain.com"
      ],
    },
    {
      name: "Competitive Eating",
      courseCode: "COSC4839",
      semester: "Semester 2",
      applicants: ["harpertaylor652@domain.com"],
    },
    {
      name: "Introduction to Lebron",
      courseCode: "COSC4830",
      semester: "Semester 1",
      applicants: ["henrythomas225@domain.com"],
    },
  ];

  const [courses, setCourses] = useState<Course[]>(defaultCourses);

  useEffect(() => {
    const lastCourseState = localStorage.getItem("courseDetails");
    if (lastCourseState) {
      console.log("lastcoursestate was" + JSON.parse(lastCourseState));
      setCourses(JSON.parse(lastCourseState));
    }
  }, []);

  return (
    <>
      <p>welcome to home page</p>
      { currentUser.user.User_Type == "default" ? (
          <LecturerHomePage courses={courses} setCourses={setCourses} />
      ) : currentUser.user.User_Type == "lecturer" ? (
        <>
          <p>You are a lecturer</p>
          <LecturerHomePage courses={courses} setCourses={setCourses} />
        </>
      ) : currentUser.user.User_Type === "tutor" ? (
        <>
          <p>You are a tutor</p>
          <TutorHomePage courses={courses} setCourses={setCourses} />
        </>
      ) : (
        <p>Unknown status</p>
      )}
    </>
  );
}
