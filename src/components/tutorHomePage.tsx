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
import {UserCredential} from "@/interfaces/Types";

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

  useEffect(() => {
    const lastFormSubmission = localStorage.getItem("tutorDetails");

    if (lastFormSubmission) {
      console.log(lastFormSubmission);
      setCurrentTutor(JSON.parse(lastFormSubmission));
    }
  }, []);

  let detailArray: [string, keyof DetailValues][] = [
    ["Previous Roles", "previousRoles"],
    ["Availability", "availability"],
    ["Skills", "skills"],
    ["Credentials", "credentials"],
  ];

  const form = useForm<DetailValues>({
    mode: "uncontrolled",
    initialValues: {
      email: currentUser.user.User_Email,
      name: currentUser.user.User_Name,
      previousRoles: "",
      availability: "Part time",
      skills: "",
      credentials: "",
    },

    validate: {},
  });
  const handleSubmit = (values: typeof form.values) => {
    setCurrentTutor(values);
    updateCredentialsWithTutorDetails(values);
  };

  const isEmptyCred = (details: UserCredential) => {
    return (
        details.previousRoles === "" &&
        details.availability === "" &&
        details.skills === "" &&
        details.credentials === ""
    );
  };

  const isEmptyDetail = (details: DetailValues) => {
    return (
        details.name === "" &&
        details.email === "" &&
        details.previousRoles === "" &&
        details.availability === "" &&
        details.skills === "" &&
        details.credentials === ""
    );
  };

  function updateCredentialsWithTutorDetails(tutorDetailsParsed: DetailValues) {
    const allCredentials = localStorage.getItem("Credentials");

    if (allCredentials && !(isEmptyDetail(tutorDetailsParsed))) {
      //console.log(tutorDetailsParsed.email + "(from updateCredentialsWithTutorDetails)")
      const AlltutorCredentialsParsed: Record<string, UserCredential> = JSON.parse(allCredentials);
      AlltutorCredentialsParsed[tutorDetailsParsed.email] = {
        skills: tutorDetailsParsed.skills,
        previousRoles: tutorDetailsParsed.previousRoles,
        availability: tutorDetailsParsed.availability,
        credentials: tutorDetailsParsed.credentials
      };
      console.log(AlltutorCredentialsParsed, "(from updateCredentialsWithTutorDetails)")
      localStorage.setItem("Credentials", JSON.stringify(AlltutorCredentialsParsed))
    } else {
      //console.log(allCredentials+ "(from updateCredentialsWithTutorDetails)")
      //console.log(tutorDetailsParsed + "(from updateCredentialsWithTutorDetails)")
    }

  }

  const applyForCourse = (course: IndCourse) => {
    let All_Credentials: Record<string, UserCredential> = {}
    let tutorDetails: DetailValues = {
      email: "",
      name: "",
      previousRoles: "",
      availability: "",
      skills: "",
      credentials: "",
    } //empty
    try {
      All_Credentials = JSON.parse(localStorage.getItem("Credentials"));
      tutorDetails = {
        email: currentUser.user.User_Email,
        name: currentUser.user.User_Name,
        previousRoles: All_Credentials[currentUser.user.User_Email].previousRoles,
        availability: All_Credentials[currentUser.user.User_Email].availability,
        skills: All_Credentials[currentUser.user.User_Email].skills,
        credentials: All_Credentials[currentUser.user.User_Email].credentials,
      }
    }
    catch (e) {console.log(e)}


    if (!isEmptyDetail(tutorDetails)) {
      const tutorDetailsParsed:DetailValues = tutorDetails
      let duplicateFound: boolean = false;
      for (let index = 0; index < course.applicants.length; index++) {
        if (course.applicants[index].email === currentUser.user.User_Email) {
          console.log("found");
          course.applicants[index] = tutorDetailsParsed;
          duplicateFound = true;
        }
      }
      if (!duplicateFound) {
        console.log("not found");
        course.applicants.push(tutorDetailsParsed);
      }
      localStorage.setItem("courseDetails", JSON.stringify(courses));
      console.log(course.applicants);
      console.log(courses);
    }
  };
  return (
      <>
        <Group justify="flex-start" grow gap="xl" align="flex-start">
          <Stack>
            <Title>Courses</Title>
            <Accordion>
              {courses.map((course, index) => (
                  <>
                    <AccordionItem value={course.name}>
                      <AccordionControl>{course.name}</AccordionControl>
                      <AccordionPanel>
                        <Stack>
                          {" "}
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

          <Box>
            <Flex
                direction="column"
                style={{
                  border: "1px solid black",
                  maxWidth: "500px",
                  backgroundColor: theme.primaryColor,
                  fontFamily: theme.fontFamily,
                  padding: theme.spacing.md,
                }}
            >
              <Title order={2}>Your Details</Title>
              {detailArray.map((field, index) => (
                  <>
                    <Title order={4} key={index}>
                      {field[0]}
                    </Title>
                    {currentTutor ? (
                        <Text>{currentTutor[field[1]]}</Text>
                    ) : (
                        <Text>Not set</Text>
                    )}
                  </>
              ))}
            </Flex>
            <Button variant="filled" size="md" onClick={open}>
              Update Details
            </Button>
          </Box>
          <Modal opened={opened} onClose={close} title="Update Details">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              {/* <TextInput
              {...form.getInputProps("name")}
              mt="md"
              label="Name"
              placeholder="Name"
              required
            /> */}
              <TextInput
                  {...form.getInputProps("previousRoles")}
                  mt="md"
                  label="Previous Roles"
                  placeholder="Previous Roles"
                  required
              />
              <Text size="sm" style={{ marginBottom: "3px", marginTop: "16px" }}>
                Availability
              </Text>
              <SegmentedControl
                  {...form.getInputProps("availability")}
                  data={["Part time", "Full time"]}
                  //value={form.values.availability}
                  //onChange={(value) => form.setFieldValue("availability", value)}
              ></SegmentedControl>
              <TextInput
                  {...form.getInputProps("skills")}
                  mt="md"
                  label="Skills"
                  placeholder="Skills"
                  required
              />
              <TextInput
                  {...form.getInputProps("credentials")}
                  mt="md"
                  label="Credentials"
                  placeholder="Credentials"
                  required
              />
              <Group justify="center" mt="md">
                <Button type="submit">Update</Button>
              </Group>
            </form>
          </Modal>
        </Group>
      </>
  );
};

export default tutorHomePage;