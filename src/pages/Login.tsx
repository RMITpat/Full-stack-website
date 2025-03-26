
import { TextInput, Button, PasswordInput} from '@mantine/core';
import { useForm } from '@mantine/form';
import {useEffect, useState} from "react";

export default function Login() {
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

    useEffect(() => {
        console.log("submittedValues use effect ran");
        const dummyFromLocal= JSON.parse(localStorage.getItem('DummyData'))
            ? JSON.parse(localStorage.getItem('DummyData')) : false;

        const checkPass = dummyFromLocal && dummyFromLocal[form.values.email]
            ? dummyFromLocal[form.values.email].password === form.values.password
            : false;
        console.log(form.values.email)
        console.log(Object.keys(dummyFromLocal));

        switch (checkPass) {
            case false: console.log("login failed"); break;
            case true: console.log("login success"); break;
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


