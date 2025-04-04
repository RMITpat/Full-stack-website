
import { TextInput, Button, PasswordInput} from '@mantine/core';
import { useForm } from '@mantine/form';
import {useEffect, useState} from "react";
import {useLoginContext} from "@/pages/contexts/LoginContext";

export default function Login() {
    interface user {
        email: string;
        name: string;
        type: string;
    }


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
        // @ts-ignore

        const dummyFromLocal= JSON.parse(localStorage.getItem('DummyData'))
            // @ts-ignore
            ? JSON.parse(localStorage.getItem('DummyData')) : false;

        const checkPass = dummyFromLocal && dummyFromLocal[form.values.email]
            ? dummyFromLocal[form.values.email].password === form.values.password
            : false;

        switch (checkPass) {
            case false: console.log("login failed");
                break;
            case true: console.log("login success");

            break;
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


