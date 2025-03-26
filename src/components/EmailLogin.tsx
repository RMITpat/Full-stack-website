import { IconAlertTriangle } from '@tabler/icons-react';
import { useState } from 'react';
import { TextInput } from '@mantine/core';
import classes from '../styles/InvalidInput.module.css';

export function EmailLogin() {
    const [value, setValue] = useState('');
    return (
        <TextInput
            label="Email"
            placeholder="example@domain.com"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
        />
    );
}