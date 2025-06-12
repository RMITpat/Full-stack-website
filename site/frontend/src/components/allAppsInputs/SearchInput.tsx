// SearchInput.tsx
import { IconSearch } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';

export function SearchInput({
                                value,
                                onChange,
                            }: {
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <TextInput
            radius="xl"
            size="md"
            placeholder="search"
            rightSectionWidth={42}
            rightSection={<IconSearch size={18} stroke={1.5} />}
            value={value}
            onChange={(event) => onChange(event.currentTarget.value)}
        />
    );
}
