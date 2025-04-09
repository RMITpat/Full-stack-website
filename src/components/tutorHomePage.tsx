import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLoginContext } from "../pages/contexts/LoginContext";
import {
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Autocomplete,
  Flex,
  Stack,
} from "@mantine/core";
import {
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
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Course } from "@/interfaces/Interfaces"
import { Application } from "../interfaces/Types"

//courses[name, code, semester applicantsArray[applicantDetails]]
interface tutorHomePageProps {
  courses: Course[];
  setCourses: Dispatch<SetStateAction<Course[]>>;
}

const tutorHomePage: React.FC<tutorHomePageProps> = ({
  courses,
  setCourses,
}) => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  const [submittedValues, setSubmittedValues] = useState<
    Application | undefined
  >(undefined);

  useEffect(() => {
    const lastFormSubmission = localStorage.getItem("tutorDetails");

    if (lastFormSubmission) {
      console.log(lastFormSubmission);
      setSubmittedValues(JSON.parse(lastFormSubmission));
    }
  }, []);
  

  let detailArray: [string, keyof Application][] = [
    ["Name", "name"],
    ["Previous Roles", "previousRoles"],
    ["Availability", "availability"],
    ["Skills", "skills"],
    ["Credentials", "credentials"],
  ];
  
  
  

  const form = useForm<Application>({
    mode: "uncontrolled",
    initialValues: {
      course: "",
      name: "",
      previousRoles: "",
      availability: "Part time",
      skills: "",
      credentials: "",
    },

    validate: {},
  });
  const handleSubmit = (values: typeof form.values) => {
    setSubmittedValues(values);
    localStorage.setItem("tutorDetails", JSON.stringify(values));
  };
  const applyForCourse = (course: Course) => {
    const tutorDetails = localStorage.getItem("tutorDetails");

    if (tutorDetails) {
      const tutorDetailsParsed: Application = JSON.parse(tutorDetails)

      //course.applicants.push(tutorDetailsParsed);
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
                {submittedValues ? (
                  <Text>{submittedValues[field[1]]}</Text>
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
            <TextInput
              {...form.getInputProps("name")}
              mt="md"
              label="Name"
              placeholder="Name"
              required
            />
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
