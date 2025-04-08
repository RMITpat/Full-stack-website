import { Anchor, Group, PasswordInput, Text } from '@mantine/core';


export function PassLogin() {

    return (
        <>
            <Group justify="space-between" mb={5}>
                <Text component="label" htmlFor="your-password" size="sm" fw={500}>
                    Your password
                </Text>
                {/*leaving this here incase we want to add it later*/}
                {/*<Anchor href="#" onClick={(event) => event.preventDefault()} pt={2} fw={500} fz="xs">*/}
                {/*    Forgot your password?*/}
                {/*</Anchor>*/}
            </Group>
            <PasswordInput
                placeholder="Your password" id="your-password"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
            />
        </>
    );
}