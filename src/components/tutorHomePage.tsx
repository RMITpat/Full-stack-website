import { useContext, useEffect, useState } from "react";
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

interface detailValues {
  name: string;
  previousRoles: string;
  availability: string;
  skills: string;
  credentials: string;
}

export default function PassLogin() {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  const [submittedValues, setSubmittedValues] = useState<
    detailValues | undefined
  >(undefined);

  useEffect(() => {
    const lastFormSubmission = localStorage.getItem("tutorDetails");

    if (lastFormSubmission) {
      console.log(lastFormSubmission);
      setSubmittedValues(JSON.parse(lastFormSubmission));
    }
  }, []);

  let detailArray: [string, keyof detailValues][] = [
    ["Name", "name"],
    ["Previous Roles", "previousRoles"],
    ["Availability", "availability"],
    ["Skills", "skills"],
    ["Credentials", "credentials"],
  ];
  let coursesArray: [string, string, string][] = [
    ["Sigma 101", "COSC1048", "Semester 1"],
    ["Competitive Eating", "COSC4839", "Semester 2"],
    ["Introduction to Lebron", "COSC4830", "Semester 1"],
  ];

  const form = useForm<detailValues>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      previousRoles: "",
      availability: "",
      skills: "",
      credentials: "",
    },

    validate: {},
  });
  const handleSubmit = (values: typeof form.values) => {
    setSubmittedValues(values);
    localStorage.setItem("tutorDetails", JSON.stringify(values));
  };

  return (
    <>
      <Group justify="flex-start" grow gap="xl" align="flex-start">
        <Stack>
          <Title>Courses</Title>
          <Accordion>
            {coursesArray.map((course, index) => (
              <AccordionItem value={course[0]}>
                <AccordionControl>{course[0]}</AccordionControl>
                <AccordionPanel>
                  <Stack>
                    {" "}
                    {course[1]} {course[2]}
                    <Button>Apply</Button>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
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
            />
            <TextInput
              {...form.getInputProps("previousRoles")}
              mt="md"
              label="Previous Roles"
              placeholder="Previous Roles"
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
            />
            <TextInput
              {...form.getInputProps("credentials")}
              mt="md"
              label="Credentials"
              placeholder="Credentials"
            />
            <Group justify="center" mt="md">
              <Button type="submit">Update</Button>
            </Group>
          </form>
        </Modal>
      </Group>
    </>
  );
}
