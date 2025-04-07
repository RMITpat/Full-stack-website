// this whole file is chatgpt'd
type DetailValues = {
    course: string;
    name: string;
    previousRoles: string;
    availability: string;
    skills: string;
    credentials: string;
};

export default function DummyApplications() {
    const dummyFromLocal = localStorage.getItem("DummyData");
    const parsedData = dummyFromLocal ? JSON.parse(dummyFromLocal) : null;

    if (parsedData) {
        const tutors = Object.entries(parsedData)
            .filter(([_, user]) => user.type === "tutor")
            .map(([email, user]) => ({ email, ...user }));

        console.log("Tutors found:", tutors);

        const dummyApplications: Record<string, DetailValues> = {};

        tutors.forEach((tutor) => {
            const course = "compsci";

            const application: DetailValues = {
                course,
                name: `${tutor.firstName ?? ""} ${tutor.lastName ?? ""}`.trim(),
                previousRoles: "Tutor Assistant at XYZ Uni",
                availability: "Mon-Wed 9am-1pm",
                skills: "JavaScript, React, Node.js",
                credentials: "Bachelor in Computer Science",
            };

            const key = `${tutor.email}_${course}`;
            dummyApplications[key] = application;
        });

        localStorage.setItem("dummyApplications", JSON.stringify(dummyApplications));
        console.log("Dummy applications saved:", dummyApplications);
    } else {
        console.log("Dummy data insert doesn't seem to have worked :(");
    }
    return null;
}
