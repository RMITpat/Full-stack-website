import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    isRequired?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, placeholder, isRequired }) => {
    return (
        <FormControl isRequired={isRequired}>
            <FormLabel>{label}</FormLabel>
            <Input type={type} value={value} onChange={onChange} placeholder={placeholder} />
        </FormControl>
    );
};
export default InputField;