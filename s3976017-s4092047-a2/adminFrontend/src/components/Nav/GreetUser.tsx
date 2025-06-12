import { useLoginContext } from "@/components/contexts/LoginContext";
import React from "react";

export default function GreetUser() {
  const { loggedIn } = useLoginContext();
  return <>{loggedIn ? <p>Hello admin! </p> : <p></p>}</>;
}
