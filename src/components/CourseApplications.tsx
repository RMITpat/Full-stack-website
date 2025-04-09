import AppliCard from "@/components/AppliCard";
import { ApplicationMap } from "@/interfaces/Types";
import {Flex} from "@mantine/core"
import { useEffect, useState } from "react";

export default function CourseApplications() {
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

    const keys = Object.keys(allApps);
    return (
        <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap">
            {keys.map((key) => (
                <AppliCard key={key} app={allApps[key]} />
            ))}
        </Flex>
    );
}
