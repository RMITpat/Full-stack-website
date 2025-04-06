import { useLoginContext } from "./contexts/LoginContext";

import TutorHomePage from "../components/tutorHomePage";
import LecturerHomePage from "../components/lecturerHomePage";

import { SetStateAction, useEffect, useState } from "react";
import { Course } from "../interfaces/interfaces"
import { DetailValues } from "../interfaces/interfaces"

export default function Home() {
  const occupation = useLoginContext();
  let defaultCourses: Course[] = [
      
        {name: "Sigma 101", courseCode: "COSC1048", semester: "Semester 1", applicants: []}
      ,
      
        {name: "Competitive Eating", courseCode: "COSC4839", semester: "Semester 2", applicants: []}
      ,
      
        {name: "Introduction to Lebron", courseCode: "COSC4830",semester: "Semester 1", applicants:[]}
      ,
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
      { occupation == "signedOut" ? (
        <p>Please sign in</p>
      ) : occupation.user.User_Type == "lecturer" ? (
        <>
          <p>You are a lecturer</p>
          <LecturerHomePage courses={courses} setCourses={setCourses} />
        </>
      ) : occupation.user.User_Type === "tutor" ? (
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
