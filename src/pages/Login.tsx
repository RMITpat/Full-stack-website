import { TextInput, Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useLoginContext } from "@/pages/contexts/LoginContext";
import router, { useRouter } from "next/router";
import { User } from "@/interfaces/Types";
import getAllUsers from "@/api/GetAllUsers";
export default function Login() {
  const { setUser } = useLoginContext();
  const router = useRouter();
  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const [submittedValues, setSubmittedValues] = useState<
    typeof form.values | null
  >(null);

  //this authenticates a user signing in with the password
  // associated with the email they entered in the login form
  useEffect(() => {
    const parsed_users = getAllUsers()
    const user = parsed_users[form.values.email];

    const checkPass = user?.User_Password === form.values.password;

    if (checkPass) {
      console.log("login success");
      router.push("/");
      setUser(user)
      localStorage.setItem("prevUser", JSON.stringify(user))
    } else {
      console.log("login failed");
    }
  }, [submittedValues]);


  return (
    <form onSubmit={form.onSubmit(setSubmittedValues)}>
      <TextInput
        {...form.getInputProps("email")}
        mt="md"
        label="Email"
        placeholder="Email"
      />
      <PasswordInput
        {...form.getInputProps("password")}
        mt="md"
        label="Password"
        placeholder="Password"
      />
      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}
