import {
    Box,
    Button,
    VStack,
    Heading,
    Text,
} from "@chakra-ui/react";

import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'

import { useState } from "react";
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
            <VStack spacing={8} align="stretch">
                <Heading textAlign="center">Registration Form</Heading>
                <Text textAlign="center" color="gray.600">
                    Please fill out all the fields below
                </Text>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <InputField
                            label="Name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your name"
                            isRequired
                        />
                        <InputField
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email"
                            isRequired
                        />
                        <InputField
                            label="Age"
                            type="number"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            placeholder="Enter your age"
                            isRequired
                        />
                        <SelectField
                            label="Occupation"
                            value={formData.occupation}
                            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                            options={occupationOptions}
                        />
                        <Button type="submit" colorScheme="blue" width="100%" mt={4}>
                            Submit
                        </Button>
                    </VStack>
                </form>
            </VStack>
        </Box>
    );
};

export default RegistrationForm;
