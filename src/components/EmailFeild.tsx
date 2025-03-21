import { useState } from 'react';
import { TextInput } from '@mantine/core';
import classes from '../styles/FloatingLabelInput.module.css';


interface EmailFieldProps {
    label: string;
    placeholder: string;
}

const EmailField: React.FC<EmailFieldProps> = ({ label, placeholder }) => {

    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const floating = value.trim().length !== 0 || focused || undefined;
    return (
        <TextInput
            label= {label}
            placeholder= {placeholder}
            required
            classNames={classes}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            mt="md"
            autoComplete="nope"
            data-floating={floating}
            labelProps={{ 'data-floating': floating }}
        />
    );
};
export default EmailField;