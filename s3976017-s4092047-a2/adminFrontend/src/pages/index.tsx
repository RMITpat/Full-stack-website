import { Title } from "@mantine/core";
import { useLoginContext } from "../components/contexts/LoginContext";
import AdminHomePage from "@/components/admin/adminHomePage";
export default function Home() {
  const loginContext = useLoginContext();

  return (
    <>
      {loginContext.loggedIn ? (
        <AdminHomePage></AdminHomePage>
      ) : (
        <Title>Welcome to the admin dashboard, please log in</Title>
      )}
    </>
  );
}
