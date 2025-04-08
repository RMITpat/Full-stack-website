import AppliCard from "@/components/AppliCard";
import { ApplicationMap } from "@/interfaces/Types";
import {Flex} from "@mantine/core"

export default function CourseApplications() {
    const stored = localStorage.getItem("DummyApplications");

    if (!stored) {
        return <div>No applications found.</div>;
    }

    const allApps: ApplicationMap = JSON.parse(stored);
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
