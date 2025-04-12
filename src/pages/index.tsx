import { useLoginContext } from "./contexts/LoginContext";

import TutorHomePage from "../components/tutorHomePage";
import LecturerHomePage from "../components/lecturerHomePage";

import { SetStateAction, useEffect, useState } from "react";
import { IndCourse } from "../interfaces/Interfaces";
import { Card, Text } from "@mantine/core";
import UpdateApplication from "@/api/UpdateApplications";
import updateApplication from "@/api/UpdateApplications";
export default function Home() {
  const currentUser = useLoginContext();
  let defaultCourses: IndCourse[] = [
    {
      name: "Sigma 101",
      courseCode: "COSC1048",
      semester: "Semester 1",
      selectedApplicants: [],
      lecturerRankings: {},
      applicants: [
        {
          email: "benjaminlopez1012@domain.com",
          name: "Benjamin Lopez",
          previousRoles: "Software Engineer, Team Lead",
          availability: "Full-time",
          skills: "JavaScript, React, TypeScript, Node.js",
          credentials: "Bachelor of Computer Science, Certified Scrum Master",
        },
        {
          email: "charlottegonzalez1013@domain.com",
          name: "Charlotte Gonzalez",
          previousRoles: "Project Manager, Consultant",
          availability: "Part-time",
          skills: "Agile, PMP, Stakeholder Management",
          credentials: "MBA, PMP Certified",
        },
        {
          email: "lucaswilson1014@domain.com",
          name: "Lucas Wilson",
          previousRoles: "UI/UX Designer, Graphic Designer",
          availability: "Full-Time",
          skills: "Adobe XD, Figma, Sketch",
          credentials: "Bachelor of Design, Adobe Certified Expert",
        },
      ],
    },
    {
      name: "Competitive Eating",
      courseCode: "COSC4839",
      semester: "Semester 2",
      selectedApplicants: [],
      lecturerRankings: {},
      applicants: [
        {
          email: "ameliaanderson1015@domain.com",
          name: "Amelia Anderson",
          previousRoles: "Software Engineer, Team Lead",
          availability: "Full-time",
          skills: "JavaScript, React, TypeScript, Node.js",
          credentials: "Bachelor of Computer Science, Certified Scrum Master",
        },
        {
          email: "henrythomas1016@domain.com",
          name: "Henry Thomas",
          previousRoles: "Project Manager, Consultant",
          availability: "Part-time",
          skills: "Agile, PMP, Stakeholder Management",
          credentials: "MBA, PMP Certified",
        },
      ],
    },
    {
      name: "Introduction to Lebron",
      courseCode: "COSC4830",
      semester: "Semester 1",
      selectedApplicants: [],
      lecturerRankings: {},
      applicants: [
        {
          email: "harpertaylor1017@domain.com",
          name: "Harper Taylor",
          previousRoles: "Software Engineer, Team Lead",
          availability: "Full-time",
          skills: "JavaScript, React, TypeScript, Node.js",
          credentials: "Bachelor of Computer Science, Certified Scrum Master",
        },
        {
          email: "alexandermoore1018@domain.com",
          name: "Alexander Moore",
          previousRoles: "Data Analyst, Business Analyst",
          availability: "Part-Time",
          skills: "SQL, Python, Tableau",
          credentials:
            "Bachelor of Economics, Certified Business Analysis Professional",
        },
        {
          email: "evelynjackson1019@domain.com",
          name: "Evelyn Jackson",
          previousRoles: "UI/UX Designer, Graphic Designer",
          availability: "Full-Time",
          skills: "Adobe XD, Figma, Sketch",
          credentials: "Bachelor of Design, Adobe Certified Expert",
        },
      ],
    },
  ];

  const [courses, setCourses] = useState<IndCourse[]>(defaultCourses);
  useEffect(() => {
    const lastCourseState = localStorage.getItem("courseDetails");
    if (lastCourseState) {
      console.log("lastcoursestate was" + JSON.parse(lastCourseState));
      setCourses(JSON.parse(lastCourseState));
    } else {
      localStorage.setItem("courseDetails", JSON.stringify(defaultCourses));
    }
    for (const course of defaultCourses) {
      console.log("updateApplication", course.name);
      updateApplication(course);
    }
  }, []);
  return (
    <>

      {currentUser.user.User_Type == "default" ? (
        <p>you are not logged in</p>
      ) : currentUser.user.User_Type == "logged_in_lecturer" ? (
        <>
          <LecturerHomePage courses={courses} setCourses={setCourses} />
        </>
      ) : currentUser.user.User_Type === "logged_in" ||
        currentUser.user.User_Type === "admin_default" ? (
        <>
          <TutorHomePage courses={courses} setCourses={setCourses} />
        </>
      ) : (
        <p>Unknown status</p>
      )}
    </>
  );
}
