
import { TextInput, Button, PasswordInput} from '@mantine/core';
import { useForm } from '@mantine/form';
import {useEffect, useState} from "react";
import {useLoginContext} from "@/pages/contexts/LoginContext";

export default function Login() {
    const { setUser } = useLoginContext();

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value)) ? null : 'Invalid email'
        },
    });

    const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);

    //this authenticates a user signing in with the password accociated with the email they entered in the login form
    useEffect(() => {

        //gets sample user data, or is false
        const dummyFromLocal= JSON.parse(localStorage.getItem('DummyData'))
            ? JSON.parse(localStorage.getItem('DummyData')) : false;

        //gets valid user password for entered email from sample data, or is false
        const checkPass = dummyFromLocal && dummyFromLocal[form.values.email]
            ? dummyFromLocal[form.values.email].password === form.values.password
            : false;

        if (checkPass) {
            const loggedInUser = dummyFromLocal[form.values.email];
            //this makes sure the stored user type is compatible with login context
            const handled_user_type = loggedInUser.type === "tutor" || loggedInUser.type === "lecturer"
                ? loggedInUser.type
                : "default";
            setUser({
                User_Name: loggedInUser.name,
                User_Email: form.values.email,
                User_Type: handled_user_type,
                User_Img_Url: loggedInUser.img_url || "",
            });

            console.log("login success");
        } else {
            console.log("login failed");
        }

    }, [submittedValues]);

    return (

        <form onSubmit={form.onSubmit(setSubmittedValues)}>
            <TextInput {...form.getInputProps('email')} mt="md" label="Email" placeholder="Email" />
            <PasswordInput {...form.getInputProps('password')} mt="md" label="Password" placeholder="Password"/>

            <Button type="submit" mt="md">
                Submit
            </Button>

        </form>

    );
}


