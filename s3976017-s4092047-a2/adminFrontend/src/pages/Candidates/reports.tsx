import { Button, Group, Stack, Title, Select, Table } from "@mantine/core";
import { useLoginContext } from "@/components/contexts/LoginContext";
import NotLoggedIn from "@/components/admin/notLoggedIn";
import { useRouter } from "next/router";
import { adminService } from "@/graphQLservices/api";
import { Applicant, Course } from "@/interfaces/Interfaces";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Reports() {
  const loginContext = useLoginContext();
  const router = useRouter();
  const [loading, setLoading] = useState<string>("");

  const [chosenCandidates, setChosenCandidates] = useState<
    { course: Course; candidates: Applicant[] }[]
  >([]);
  const [candidatesMoreThan3, setCandidatesMoreThan3] = useState<
    {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      numCoursesVotedFor: number;
    }[]
  >([]);
  const [candidatesNotChosen, setCandidatesNotChosen] = useState<
    {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      timesVoted: number;
    }[]
  >([]);
  const [reportType, setReportType] = useState<string | null>("");
  const REPORT_TYPES = {
    EACH_COURSE: "Candidates chosen for each course",
    MORE_THAN_3: "Candidates chosen for more than 3 courses",
    NOT_CHOSEN: "Candidates not chosen for any courses",
  };

  const fetchCandidatesForCourse = async (course: Course) => {
    try {
      const candidates = await adminService.getCandidatesForCourse(course.id);
      return candidates;
    } catch {
      toast.error("Failed to get candidates for course");
      return [];
    }
  };
  const fetchReportData = async () => {
    if (reportType == REPORT_TYPES.EACH_COURSE) {
      try {
        setLoading("Loading");

        const courses = await adminService.getCourses();
        const candidatesArray = await Promise.all(
          courses.map(async (course) => {
            const candidates = await fetchCandidatesForCourse(course);
            console.log(candidates);
            return { course, candidates };
          })
        );
        setChosenCandidates(candidatesArray);
        console.log(candidatesArray);
      } catch {
        toast.error("error");
      }
      setLoading("");
    }
    if (reportType == REPORT_TYPES.MORE_THAN_3) {
      try {
        setLoading("Loading");

        const applicants = await adminService.getApplicantsMoreThan3();
        setCandidatesMoreThan3(applicants);
      } catch {
        toast.error("Error generating report");
      }
      setLoading("");
    }
    if (reportType == REPORT_TYPES.NOT_CHOSEN) {
      try {
        setLoading("Loading");

        const applicants = await adminService.getApplicantsNotChosen();
        setCandidatesNotChosen(applicants);
      } catch {
        toast.error("Error generating report");
      }
      setLoading("");
    }
  };
  const candidateRows = (courseAndCandidates: {
    course: Course;
    candidates: Applicant[];
  }) => {
    return courseAndCandidates.candidates.map((candidate) => (
      <Table.Tr key={candidate.id}>
        <Table.Td>{`${candidate.firstName} ${candidate.lastName}`}</Table.Td>
        <Table.Td>{candidate.email}</Table.Td>
      </Table.Tr>
    ));
  };

  const candidateMoreThan3Rows = candidatesMoreThan3.map((candidate) => (
    <Table.Tr key={candidate.id}>
      <Table.Td>{`${candidate.firstName} ${candidate.lastName}`}</Table.Td>
      <Table.Td>{candidate.email}</Table.Td>
      <Table.Td>{candidate.numCoursesVotedFor}</Table.Td>
    </Table.Tr>
  ));

  const candidatesNotChosenRows = candidatesNotChosen.map((candidate) => (
    <Table.Tr key={candidate.id}>
      <Table.Td>{`${candidate.firstName} ${candidate.lastName}`}</Table.Td>
      <Table.Td>{candidate.email}</Table.Td>
      <Table.Td>{candidate.timesVoted}</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      {loginContext.loggedIn ? (
        <>
          <Stack>
            {" "}
            <Group justify="space-between">
              <Title>Candidate Reports</Title>{" "}
              <Button onClick={() => router.push("/Candidates")}>Back</Button>
            </Group>
            <Group w="100%">
              <Select
                w="30%"
                data={[
                  REPORT_TYPES.EACH_COURSE,
                  REPORT_TYPES.MORE_THAN_3,
                  REPORT_TYPES.NOT_CHOSEN,
                ]}
                value={reportType}
                onChange={setReportType}
              ></Select>
              <Button onClick={() => fetchReportData()}>Generate</Button>
            </Group>
          </Stack>
          {loading}

          {reportType == REPORT_TYPES.EACH_COURSE ? (
            chosenCandidates.length != 0 &&
            chosenCandidates.map((courseAndCandidates, index) => {
              return (
                <Stack key={index} mt="md">
                  <Title>{courseAndCandidates.course.name}</Title>
                  <Table.ScrollContainer minWidth={100}>
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Name</Table.Th>
                          <Table.Th>Email</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {candidateRows(courseAndCandidates)}
                      </Table.Tbody>
                    </Table>
                  </Table.ScrollContainer>
                </Stack>
              );
            })
          ) : reportType == REPORT_TYPES.MORE_THAN_3 ? (
            candidatesMoreThan3.length != 0 && (
              <Table.ScrollContainer minWidth={500}>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>Email</Table.Th>

                      <Table.Th>Number of courses voted in</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{candidateMoreThan3Rows}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            )
          ) : reportType == REPORT_TYPES.NOT_CHOSEN ? (
            candidatesNotChosen.length != 0 && (
              <Table.ScrollContainer minWidth={500}>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>Email</Table.Th>

                      <Table.Th>Times voted</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{candidatesNotChosenRows}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            )
          ) : (
            <p>Choose a report to generate</p>
          )}
        </>
      ) : (
        <NotLoggedIn></NotLoggedIn>
      )}
    </>
  );
}
