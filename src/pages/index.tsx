import { useLoginContext } from "./contexts/LoginContext";

import TutorHomePage from "../components/tutorHomePage";

export default function Home() {
  const occupation = useLoginContext();

  return (
    <>
      <p>welcome to home page</p>
      {occupation == "signedOut" ? (
        <p>Please sign in</p>
      ) : occupation == "lecturer" ? (
        <p>You are a lecturer</p>
      ) : occupation === "tutor" ? (
        <>
          <p>You are a tutor</p>
          <TutorHomePage />
        </>
      ) : (
        <p>Unknown status</p>
      )}
    </>
  );
}
