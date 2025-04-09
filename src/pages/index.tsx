import { useLoginContext } from "./contexts/LoginContext";

import TutorHomePage from "../components/tutorHomePage";
import LecturerHomePage from "../components/lecturerHomePage";

import { SetStateAction, useEffect, useState } from "react";
import { Course } from "../interfaces/Types"
import { Application } from "../interfaces/Types"
import CourseApplications from "@/components/CourseApplications";

export default function Home() {
  const currentUser = useLoginContext();
  let defaultCourses: Course[] = [
    {
      name: "Sigma 101",
      courseCode: "COSC1048",
      semester: "Semester 1",
      applicants: [],
    },
    {
      name: "Competitive Eating",
      courseCode: "COSC4839",
      semester: "Semester 2",
      applicants: [],
    },
    {
      name: "Introduction to Lebron",
      courseCode: "COSC4830",
      semester: "Semester 1",
      applicants: [],
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
      <>
        <LecturerHomePage courses={courses} setCourses={setCourses} />
      </>
      {/* <p>welcome to home page</p>
      { currentUser.user.User_Type == "default" ? (
        <CourseApplications/>
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
      )} */}
    </>
  );
}
