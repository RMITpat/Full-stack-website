import { useEffect, useState } from "react";
import {
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Stack,
  Title,
  Button,
  Group,
  Accordion,
} from "@mantine/core";
import { applicationApi } from "@/services/applicationApi";
import { useLoginContext } from "../contexts/LoginContext";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Applicant } from "../interfaces/Interfaces";
import { Application, ApplicationType } from "../interfaces/Interfaces";
import { Course } from "../interfaces/Interfaces";
import CredentialsDisplay from "@/components/Tutor/CredentialsDisplay";
import ApplicationModal from "@/components/Tutor/ApplicationModal";

import { toast } from "react-toastify";
import { courseApi } from "@/services/courseApi";
import axios from "axios";

export default function TutorHomePage() {
  const [courses, setCourses] = useState<Course[]>([]);

  const currentUser = useLoginContext();
  const [opened, { open, close }] = useDisclosure(false);
  const defaultApplicant: Applicant = {
    id: -1,
    applications: [],
    lastName: "",
    email: "",
    firstName: "",
    password: "",
    blocked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const [currentTutor, setCurrentTutor] = useState<Applicant>(defaultApplicant);
  const [courseApplication, setCourseApplication] = useState<Course>(
    courses[0]
  );

  /* 

Validation of user inputs:
-All form fields are required
-All form text fields contain validation that ensures that the trimmed input has length > 0, ie the submission isn't just spaces
-The system will also not submit an application that has empty fields
-There is also backend validation as evidenced in application.dto.ts but mantine validation prevents the request from sending
so you don't actually see the error
The tutor also cannot submit multiple applications because each time the Apply button is pressed, a course's applicants are searched for duplicates.
If a duplicate is found then it replaces that application to faciliate the updating of applications.


*/

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const allCourses = await courseApi.getCourses();

      setCourses(allCourses);
      console.log("from fetchCourses 70:" + allCourses);
    } catch {
      toast.error("Failed to fetch courses");
    }
  };

  useEffect(() => {
    const applicant: Applicant = {
      id: currentUser.user.User_id,
      firstName: currentUser.user.User_FirstName,
      lastName: currentUser.user.User_LastName,
      email: currentUser.user.User_Email,
      password: currentUser.user.User_Password,
      blocked: currentUser.user.User_blocked,
      applications: [],
      createdAt: currentUser.user.User_Date_Joined,
      updatedAt: currentUser.user.User_Updated_At,
    };

    setCurrentTutor(applicant);
  }, [currentUser.user]);
  const form = useForm<Application>({
    mode: "uncontrolled",
    initialValues: {
      id: currentTutor.id,
      applicant: currentTutor,
      type: ApplicationType.TUTOR,
      course: courses[0],
      previousRoles: "",
      availability: "Part time",
      skills: "",
      credentials: "",
      averageRanking: 0,
      comments: [],
      timesChosen: 0,
    },

    validate: {
      previousRoles: (value) =>
        value.trim().length > 0 ? null : "Previous Roles are required",
      skills: (value) =>
        value.trim().length > 0 ? null : "Skills are required",
      credentials: (value) =>
        value.trim().length > 0 ? null : "Credentials are required",
    },
  });

  const handleSubmit = async (values: Application) => {
    //update courses applications
    try {
      await applicationApi.createApplication(values);

      toast.success("Application successful!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error("You may only apply for this role once");
        } else {
          toast.error("Application failed");
        }
      } else {
        toast.error("Application failed");
      }
    }
  };
  const startApplying = async (course: Course) => {
    console.log(currentUser.user);
    open();
    setCourseApplication(course);
  };

  return (
    <>
      <Group justify="space-between" grow align="flex-start">
        <Stack>
          <Title>Courses</Title>
          <Accordion>
            {courses.map((course) => (
              <>
                <AccordionItem value={course.name}>
                  <AccordionControl>{course.name}</AccordionControl>
                  <AccordionPanel>
                    {course.code} {course.semester}
                    <Group>
                      <Button onClick={() => startApplying(course)}>
                        Apply
                      </Button>
                    </Group>
                  </AccordionPanel>
                </AccordionItem>
              </>
            ))}
          </Accordion>
        </Stack>
        <CredentialsDisplay currentTutor={currentUser.user} />
        <ApplicationModal
          opened={opened}
          close={close}
          form={form}
          handleSubmit={handleSubmit}
          course={courseApplication}
        />{" "}
      </Group>
    </>
  );
}
