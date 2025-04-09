import AppliCard from "@/components/AppliCard";
import { ApplicationMap, Tutor} from "@/interfaces/Types";
import {Flex} from "@mantine/core"
import { useEffect, useState } from "react";


type CourseApplicationProps = {
    tutes: Tutor[]
}
export default function CourseApplications({tutes}: CourseApplicationProps) {
    const [allApps, setAllApps] = useState<ApplicationMap | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("DummyApplications");
        if (stored) {
            setAllApps(JSON.parse(stored));
        }
    }, []);

    if (!allApps) {
        return <div>No applications found.</div>;
    }

    return (
        <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap">
            {tutes.map((tute, index) => (
                <AppliCard key={index} app={allApps[tute.email]} />
            ))}
        </Flex>
    );
}
