import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
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
import { useLoginContext } from "../pages/contexts/LoginContext";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { IndCourse } from "../interfaces/Interfaces";
import { DetailValues } from "../interfaces/Interfaces";
import {
  ApplicationDetails,
  ApplicationDetailsWithEmail,
  UserCredential,
} from "@/interfaces/Types";
import CredentialsDisplay from "@/components/Tutor/CredentialsDisplay";
import CredentialsModal from "@/components/Tutor/CredentialsModal";

import ApplicantToAppStat from "@/api/ApplicantToAppStat";
import getApplicationStatuses from "@/api/getApplicationStatuses";
import UpdateApplication from "@/api/UpdateApplications";
import { isEmptyDetail } from "@/api/isEmpty";

//courses[name, code, semester applicantsArray[applicantDetails]]
interface tutorHomePageProps {
  courses: IndCourse[];
  setCourses: Dispatch<SetStateAction<IndCourse[]>>;
}

const tutorHomePage: React.FC<tutorHomePageProps> = ({
  courses,
  setCourses,
}) => {
  const currentUser = useLoginContext();
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [currentTutor, setCurrentTutor] = useState<DetailValues | undefined>(
    undefined
  );

  /* 

Validation of user inputs:
-All form fields are required
-All form text fields contain validation that ensures that the trimmed input has length > 0, ie the submission isn't just spaces
-The system will also not submit an application that has empty fields

The tutor also cannot submit multiple applications because each time the Apply button is pressed, a course's applicants are searched for duplicates.
If a duplicate is found then it replaces that application to faciliate the updating of applications.


*/
  const form = useForm<DetailValues>({
    mode: "uncontrolled",
    initialValues: {
      email: currentUser.user.User_Email,
      name: currentUser.user.User_Name,
      previousRoles: "",
      availability: "Part time",
      skills: "",
      credentials: "",
      lecturerComments: []
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

  const handleSubmit = (values: typeof form.values) => {
    setCurrentTutor(values);
    updateCredentialsWithTutorDetails(values);
  };

  const applyForCourse = (course: IndCourse) => {
    //this function gets tutorDetails from "Credentials" in local storage,
    //and sets "course details" in local storage
    //and pushes the applicant to the array of
    //applicants that IndCourses have
    if (currentTutor) {
      let All_Credentials: Record<string, UserCredential> = {};
      let tutorDetails: DetailValues = {
        email: "",
        name: "",
        previousRoles: "",
        availability: "",
        skills: "",
        credentials: "",
        lecturerComments: []
      }; //empty
      try {
        const storedData = localStorage.getItem("Credentials");
        if (storedData) {
          All_Credentials = JSON.parse(storedData);
          tutorDetails = {
            email: currentUser.user.User_Email,
            name: currentUser.user.User_Name,
            previousRoles:
              All_Credentials[currentUser.user.User_Email].previousRoles,
            availability:
              All_Credentials[currentUser.user.User_Email].availability,
            skills: All_Credentials[currentUser.user.User_Email].skills,
            credentials:
              All_Credentials[currentUser.user.User_Email].credentials,
            lecturerComments: []
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
                    <Stack>
                      {course.courseCode} {course.semester}
                      <Button onClick={() => applyForCourse(course)}>
                        Apply
                      </Button>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              </>
            ))}
          </Accordion>
        </Stack>
        <CredentialsDisplay currentTutor={currentTutor} open={open} />
        <CredentialsModal
          opened={opened}
          close={close}
          form={form}
          handleSubmit={handleSubmit}
        />{" "}
      </Group>
    </>
  );
};

export default tutorHomePage;
