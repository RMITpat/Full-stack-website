import {
    Box,
    Button,
    VStack,
    Heading,
    Text,
} from "@chakra-ui/react";


import { useState } from "react";
import EmailFeild from "@/components/EmailFeild";
import {PassFieldStrIndicator} from "@/components/PassFieldStrIndicator";

const RegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        occupation: '',
    });

    const occupationOptions = [
        { value: 'student', label: 'Student' },
        { value: 'employed', label: 'Employed' },
        { value: 'self-employed', label: 'Self Employed' },
        { value: 'unemployed', label: 'Unemployed' },
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData); // Handle form submission
    };

    return (
        <Box p={8} maxW="500px" mx="auto">
                <Heading textAlign="center">Registration Form</Heading>
                <Text textAlign="center" color="gray.600">
                    Please fill out all the fields below
                </Text>
                <form onSubmit={handleSubmit}>

                        <EmailFeild
                            label="Email"
                            placeholder="Enter your email"
                        />
                        <PassFieldStrIndicator

                        />

                        <Button type="submit" colorScheme="blue" width="100%" mt={4}>
                            Submit
                        </Button>
                </form>
        </Box>
    );
};

export default RegistrationForm;
