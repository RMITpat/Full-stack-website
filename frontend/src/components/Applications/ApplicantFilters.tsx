import React from "react";
import {
    Grid,
    Button,
    Chip,
    Group,
    SegmentedControl,
} from "@mantine/core";
import { SearchInput } from "@/components/allAppsInputs/SearchInput"; // adjust this if it's custom

type ApplicantFiltersProps = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    availability: string | null;
    setAvailability: (val: string | null) => void;
    courseFilter: string[];
    setCourseFilter: (courses: string[]) => void;
    order: "Ascending" | "Descending";
    setOrder: (val: "Ascending" | "Descending") => void;
    onBack: () => void;
};

const ApplicantFilters: React.FC<ApplicantFiltersProps> = ({
                                                               searchTerm,
                                                               setSearchTerm,
                                                               availability,
                                                               setAvailability,
                                                               courseFilter,
                                                               setCourseFilter,
                                                               order,
                                                               setOrder,
                                                               onBack,
                                                           }) => {
    const handleChipClick = (event: React.MouseEvent<HTMLInputElement>) => {
        if (event.currentTarget.value === availability) {
            setAvailability(null);
        }
    };

    return (
        <>
            <Grid>
                <Grid.Col span={1}>
                    <Button onClick={onBack}>Back</Button>
                </Grid.Col>

                <Grid.Col span={3}>
                    <SearchInput value={searchTerm} onChange={setSearchTerm} />
                </Grid.Col>

                <Grid.Col span={3}>
                    <Chip.Group value={availability} onChange={setAvailability}>
                        <Group>
                            <Chip value="Full-Time" onClick={handleChipClick}>
                                Full-Time
                            </Chip>
                            <Chip value="Part-Time" onClick={handleChipClick}>
                                Part-Time
                            </Chip>
                        </Group>

                        <Grid.Col span={1}>
                            <SegmentedControl
                                value={order}
                                onChange={setOrder}
                                data={[
                                    { label: "Ascending", value: "Ascending" },
                                    { label: "Descending", value: "Descending" },
                                ]}
                            />
                        </Grid.Col>
                    </Chip.Group>
                </Grid.Col>

                <Grid.Col span={4}>
                    <Chip.Group multiple value={courseFilter} onChange={setCourseFilter}>
                        <Group justify="center">
                            <Chip value="COSC1048">COSC1048</Chip>
                            <Chip value="COSC4839">COSC4839</Chip>
                            <Chip value="COSC4830">COSC4830</Chip>
                        </Group>
                    </Chip.Group>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default ApplicantFilters;
