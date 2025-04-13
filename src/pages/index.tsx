import { useLoginContext } from "./contexts/LoginContext";

import TutorHomePage from "../components/tutorHomePage";
import LecturerHomePage from "../components/lecturerHomePage";

import { SetStateAction, useEffect, useState } from "react";
import { IndCourse } from "../interfaces/Interfaces";
import { Card, Text } from "@mantine/core";
import UpdateApplication from "@/api/UpdateApplications";
import updateApplication from "@/api/UpdateApplications";
import { LecturerStateProvider } from "@/pages/contexts/LecturerState";

export default function Home() {
  const currentUser = useLoginContext();
  let defaultCourses: IndCourse[] = [
    {
      name: "Sigma 101",
      courseCode: "COSC1048",
      semester: "Semester 1",
      lecturerRankings: {},
      applicants: [
        {
          email: "benjaminlopez1012@domain.com",
          name: "Benjamin Lopez",
          previousRoles: "Software Engineer, Team Lead",
          availability: "Full-time",
          skills: "JavaScript, React, TypeScript, Node.js",
          credentials: "Bachelor of Computer Science, Certified Scrum Master",
          lecturerComments: [],
        },
        {
          email: "charlottegonzalez1013@domain.com",
          name: "Charlotte Gonzalez",
          previousRoles: "Project Manager, Consultant",
          availability: "Part-time",
          skills: "Agile, PMP, Stakeholder Management",
          credentials: "MBA, PMP Certified",
          lecturerComments: [],
        },
        {
          email: "lucaswilson1014@domain.com",
          name: "Lucas Wilson",
          previousRoles: "UI/UX Designer, Graphic Designer",
          availability: "Full-Time",
          skills: "Adobe XD, Figma, Sketch",
          credentials: "Bachelor of Design, Adobe Certified Expert",
          lecturerComments: [],
        },
      ],
    },
    {
      name: "Competitive Eating",
      courseCode: "COSC4839",
      semester: "Semester 2",
      lecturerRankings: {},
      applicants: [
        {
          email: "ameliaanderson1015@domain.com",
          name: "Amelia Anderson",
          previousRoles: "Software Engineer, Team Lead",
          availability: "Full-time",
          skills: "JavaScript, React, TypeScript, Node.js",
          credentials: "Bachelor of Computer Science, Certified Scrum Master",
          lecturerComments: [],
        },
        {
          email: "henrythomas1016@domain.com",
          name: "Henry Thomas",
          previousRoles: "Project Manager, Consultant",
          availability: "Part-time",
          skills: "Agile, PMP, Stakeholder Management",
          credentials: "MBA, PMP Certified",
          lecturerComments: [],
        },
      ],
    },
    {
      name: "Introduction to Lebron",
      courseCode: "COSC4830",
      semester: "Semester 1",
      lecturerRankings: {},
      applicants: [
        {
          email: "harpertaylor1017@domain.com",
          name: "Harper Taylor",
          previousRoles: "Software Engineer, Team Lead",
          availability: "Full-time",
          skills: "JavaScript, React, TypeScript, Node.js",
          credentials: "Bachelor of Computer Science, Certified Scrum Master",
          lecturerComments: [],
        },
        {
          email: "alexandermoore1018@domain.com",
          name: "Alexander Moore",
          previousRoles: "Data Analyst, Business Analyst",
          availability: "Part-Time",
          skills: "SQL, Python, Tableau",
          credentials:
            "Bachelor of Economics, Certified Business Analysis Professional",
          lecturerComments: [],
        },
        {
          email: "evelynjackson1019@domain.com",
          name: "Evelyn Jackson",
          previousRoles: "UI/UX Designer, Graphic Designer",
          availability: "Full-Time",
          skills: "Adobe XD, Figma, Sketch",
          credentials: "Bachelor of Design, Adobe Certified Expert",
          lecturerComments: [],
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
  const renderHomePage = () => {
    const userType = currentUser.user.User_Type;

    if (userType === "default") {
      return <Text>You are not logged in</Text>;
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
