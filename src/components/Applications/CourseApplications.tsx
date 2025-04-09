import AppliCard from "@/components/Applications/AppliCard";
import {ApplicationMap, User} from "@/interfaces/Types";
import {Flex} from "@mantine/core"
import { useEffect, useState } from "react";


type CourseApplicationProps = {
    tuteEmails: string[]
}
export default function CourseApplications({tuteEmails}: CourseApplicationProps) {
    const [allApps, setAllApps] = useState<ApplicationMap | null>(null);
    const [users, setUsers] = useState<User[] | null>(null);
    console.log("tuteEmails: " +tuteEmails)
    useEffect(() => {
        const stored = localStorage.getItem("Credentials");
        const local_users = localStorage.getItem("Users")

        if (local_users) {
            const parsedUsers = JSON.parse(local_users);
            const importantUsers: User[] = tuteEmails
                .map((email) => {
                    const user = parsedUsers[email];
                    return user ? user : null;
                })
                .filter((user) => user !== null);

            setUsers(importantUsers);
        }

        if (stored) {
            setAllApps(JSON.parse(stored));
        }
    }, []);

    if (!allApps || !users) {
        console.log("courseApps "+allApps)
        console.log("courseApps "+users)
        return <div>No applications found.</div>;
    }
    console.log(allApps)
    users.map((user, index) => (console.log(index + "courseApps" + user.User_Email)))
    users.map((user, index) => (console.log(index + "courseApps" + allApps[user.User_Email])))
    return (
        <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap">
            {users.map((user, index) => (

                <AppliCard key={index} creds={allApps[user.User_Email]} user={user} />
            ))}
        </Flex>
    );
}
