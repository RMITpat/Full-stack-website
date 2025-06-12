import { Button, Group, Table, Title } from "@mantine/core";
import { useLoginContext } from "../components/contexts/LoginContext";
import { adminService } from "@/graphQLservices/api";
import { Applicant } from "@/interfaces/Interfaces";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApolloError } from "@apollo/client";
import NotLoggedIn from "@/components/admin/notLoggedIn";
import router from "next/router";
export default function Candidates() {
  const loginContext = useLoginContext();
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  const fetchApplicants = async () => {
    try {
      const applicants = await adminService.getApplicants();
      setApplicants(applicants);
    } catch {
      toast.error("Error fetching applicants");
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const toggleBlockCandidate = async (applicant: Applicant) => {
    try {
      await adminService.toggleApplicantBlock(applicant.id);
      if (!applicant.blocked) {
        toast.success(
          `${applicant.firstName} ${applicant.lastName} successfully blocked!`
        );
      } else {
        toast.success(
          `${applicant.firstName} ${applicant.lastName} successfully unblocked!`
        );
      }
      fetchApplicants();
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.message[0]);
      } else {
        toast.error("Failed to block candidate");
      }
    }
  };

  const rows = applicants.map((applicant) => (
    <Table.Tr key={applicant.id}>
      <Table.Td>{applicant.firstName}</Table.Td>
      <Table.Td>{applicant.lastName}</Table.Td>
      <Table.Td>{applicant.email}</Table.Td>
      <Table.Td>{applicant.password}</Table.Td>
      <Table.Td>
        {new Date(Number(applicant.createdAt)).toDateString()}
      </Table.Td>
      <Table.Td>
        {new Date(Number(applicant.updatedAt)).toDateString()}
      </Table.Td>
      <Table.Td>
        {!applicant.blocked ? (
          <Button bg={"red"} onClick={() => toggleBlockCandidate(applicant)}>
            Block
          </Button>
        ) : (
          <Button onClick={() => toggleBlockCandidate(applicant)}>
            Unblock
          </Button>
        )}
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      {loginContext.loggedIn ? (
        <>
          <Group justify="space-between">
            <Title>All candidates</Title>
            <Button onClick={() => router.push("/")}>Back</Button>
          </Group>
          <Group pt="md" pb="md">
            <Button onClick={() => router.push(`/Candidates/reports`)}>
              Candidate reports
            </Button>
          </Group>

          {rows.length == 0 ? (
            <p>Loading applicants..</p>
          ) : (
            <Table.ScrollContainer minWidth={500}>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>First name</Table.Th>
                    <Table.Th>Last name</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Password</Table.Th>
                    <Table.Th>Created at</Table.Th>
                    <Table.Th>Updated at</Table.Th>
                    <Table.Th>Block status</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          )}
        </>
      ) : (
        <NotLoggedIn></NotLoggedIn>
      )}
    </>
  );
}
