import {
    Box,
    Button,
    VStack,
    Heading,
    Text,
} from "@chakra-ui/react";

import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import NavBar from '@/components/NavBar'
import { useEffect, useState } from "react";

//interface formdata to describe the fields of the registration
interface FormData { 
    name: string
    email: string
    age: string
    occupation: string
}
const RegistrationForm: React.FC = () => {
    //this is type FormData. setFormData is used to set all of them. held in variable formData
    const [formData, setFormData] = useState<FormData>({
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

    /*stores the current data submission. what's in here will be loaded in the page. the type is FormData or null because it either has previous login
    details or doesn't. It is type formData so that it can hold the formData variable that is also of type FormData*/
    const [dataSubmission, setDataSubmission] = useState<FormData | null >()

    //this effect happens every time the registrationform component is mounted
    useEffect(() => {
        //it will get the lastFormSubmission from local storage
        const lastFormSubmission = localStorage.getItem("lastFormSubmission")

        //if it exists then
        if (lastFormSubmission) {
            //convert it back to formData and then set it as the current dataSubmission
            setDataSubmission(JSON.parse(lastFormSubmission))
        }
        
      }, []);
      
    //on submission this function does stuff such as preventing page reload using preventDefault() and storing the formData in localStorage
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //uses state for dataSubmission so that we can store it and have things update every time it changes
        setDataSubmission(formData)
        //converts the formData to string, not dataSubmission to string because the state may not have updated in time before the compiler reaches the next line apparently
        const currentFormSubmission = JSON.stringify(formData)
        
        //stores it locally as a string
        localStorage.setItem("lastFormSubmission", currentFormSubmission)

        
        console.log(formData); 
    };

    return (
        <>
        <NavBar />
        {/*FIXME remove*/}
        <p>last form submission was {JSON.stringify(dataSubmission)}</p>
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
        </>
    );
};

export default RegistrationForm;
