import { FormControl, FormLabel, Select } from '@chakra-ui/react';

interface SelectFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label , value, onChange, options }) => {

    return (
        <FormControl isRequired>
            <FormLabel>{label}</FormLabel>
            <Select value={value} onChange={onChange} placeholder="Select occupation">
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};
export default SelectField;