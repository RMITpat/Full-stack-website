import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Autocomplete,
  Flex,
  Stack,
  TextInput,
  Text,
  Title,
  Button,
  useMantineTheme,
  Box,
  Modal,
  Group,
  SegmentedControl,
  Accordion,
} from "@mantine/core";
import { applicationApi } from "@/services/applicationApi";
import { useLoginContext } from "../pages/contexts/LoginContext";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Applicant } from "../interfaces/Interfaces";
import {
  Application,
  ApplicationType,
  IndCourse,
} from "../interfaces/Interfaces";
import { DetailValues, Course } from "../interfaces/Interfaces";
import { User, UserCredential } from "@/interfaces/Types";
import CredentialsDisplay from "@/components/Tutor/CredentialsDisplay";
import ApplicationModal from "@/components/Tutor/ApplicationModal";

import UpdateApplication from "@/api/UpdateApplications";
import { isEmptyDetail } from "@/api/isEmpty";
import { toast } from "react-toastify";

interface tutorHomePageProps {
  courses: Course[];
  setCourses: Dispatch<SetStateAction<Course[]>>;
}

const tutorHomePage: React.FC<tutorHomePageProps> = ({
  courses,
  setCourses,
}) => {
  const currentUser = useLoginContext();
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const defaultApplicant: Applicant = {
    id: -1,
    applications: [],
    lastName: "",
    email: "",
    firstName: "",
    password: "",
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

The tutor also cannot submit multiple applications because each time the Apply button is pressed, a course's applicants are searched for duplicates.
If a duplicate is found then it replaces that application to faciliate the updating of applications.


*/
  useEffect(() => {
    const applicant: Applicant = {
      id: currentUser.user.User_id,
      firstName: currentUser.user.User_FirstName,
      lastName: currentUser.user.User_LastName,
      email: currentUser.user.User_Email,
      password: currentUser.user.User_Password,
      applications: [],
      createdAt: currentUser.user.User_Date_Joined,
      updatedAt: currentUser.user.User_Updated_At,
    };
    setCurrentTutor(applicant);
  }, [currentUser.user]);
  const form = useForm<Application>({
    mode: "uncontrolled",
    initialValues: {
      id: -1,
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

  function updateCredentialsWithTutorDetails(tutorDetailsParsed: DetailValues) {
    //this function is supposed to run tutor details are set in state
    //it saves this state to a Record in local storage
    const allCredentials = localStorage.getItem("Credentials");

    if (allCredentials && !isEmptyDetail(tutorDetailsParsed)) {
      //console.log(tutorDetailsParsed.email + "(from updateCredentialsWithTutorDetails)")
      const AlltutorCredentialsParsed: Record<string, UserCredential> =
        JSON.parse(allCredentials);
      AlltutorCredentialsParsed[tutorDetailsParsed.email] = {
        skills: tutorDetailsParsed.skills,
        previousRoles: tutorDetailsParsed.previousRoles,
        availability: tutorDetailsParsed.availability,
        credentials: tutorDetailsParsed.credentials,
      };
      console.log(
        AlltutorCredentialsParsed,
        "(from updateCredentialsWithTutorDetails)"
      );
      localStorage.setItem(
        "Credentials",
        JSON.stringify(AlltutorCredentialsParsed)
      );
    } else {
      //console.log(allCredentials+ "(from updateCredentialsWithTutorDetails)")
      //console.log(tutorDetailsParsed + "(from updateCredentialsWithTutorDetails)")
    }
  }

  const handleSubmit = async (values: Application) => {
    //update courses applications
    try {
      await applicationApi.createApplication(values);

      toast.success("Application successful!");
    } catch (err) {
      toast.error("You may only apply for this role once");
    }
  };
  const startApplying = async (course: Course) => {
    console.log(currentUser.user);
    open();
    setCourseApplication(course);
  };

  const applyForCourse = (course: IndCourse) => {
    //this function gets tutorDetails from "Credentials" in local storage,
    //and sets "course details" in local storage
    //and pushes the applicant to the array of
    //applicants that IndCourses have
    if (currentTutor) {
      toast.success("Applied!");
      let All_Credentials: Record<string, UserCredential> = {};
      let tutorDetails: DetailValues = {
        email: "",
        name: "",
        previousRoles: "",
        availability: "",
        skills: "",
        credentials: "",
        lecturerComments: [],
      }; //empty
      try {
        const storedData = localStorage.getItem("Credentials");
        if (storedData) {
          All_Credentials = JSON.parse(storedData);
          tutorDetails = {
            email: currentUser.user.User_Email,
            name: currentUser.user.User_FirstName,
            previousRoles:
              All_Credentials[currentUser.user.User_Email].previousRoles,
            availability:
              All_Credentials[currentUser.user.User_Email].availability,
            skills: All_Credentials[currentUser.user.User_Email].skills,
            credentials:
              All_Credentials[currentUser.user.User_Email].credentials,
            lecturerComments: [],
          };
        }
      } catch (e) {
        console.log(e);
      }
      //ensures that the fields are not empty before submitting, as fields are empty by default when you log in for the first time
      if (!isEmptyDetail(tutorDetails)) {
        const tutorDetailsParsed: DetailValues = tutorDetails;
        //searches the course's applicants to see if the tutor has already made an application
        let duplicateFound: boolean = false;
        for (let index = 0; index < course.applicants.length; index++) {
          if (course.applicants[index].email === currentUser.user.User_Email) {
            console.log("found");
            //if it is found then it replaces the application
            course.applicants[index] = tutorDetailsParsed;
            duplicateFound = true;
          }
        }
        //if it is not found then it adds the application
        if (!duplicateFound) {
          console.log("not found");
          course.applicants.push(tutorDetailsParsed);
        }

        UpdateApplication(course);
        localStorage.setItem("courseDetails", JSON.stringify(courses));
        //console.log(course.applicants);
        //console.log(courses);
      }
    }
  };
  return (
    <>
      <Group justify="space-between" grow align="flex-start">
        <Stack>
          <Title>Courses</Title>
          <Accordion>
            {courses.map((course, index) => (
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
};

export default tutorHomePage;
