import { useLoginContext } from "@/contexts/LoginContext";
import React from "react";

export default function GreetUser() {
  const { user } = useLoginContext();
  return <p>Hello! {user.User_FirstName}</p>;
}
