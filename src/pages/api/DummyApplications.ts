import { Tutor, Application, ApplicationMap } from '@/interfaces/Types'

const hardcodedApplications: Application[] = [
    {
        course: "compsci",
        name: "",
        previousRoles: "Teaching Assistant",
        availability: "Part-time",
        skills: "Python, Algorithms",
        credentials: "BSc in CS",
    },
    {
        course: "datasci",
        name: "",
        previousRoles: "Lab Supervisor",
        availability: "Full-time",
        skills: "R, Data Analysis",
        credentials: "MSc in Data Science",
    },
    {
        course: "softwareeng",
        name: "",
        previousRoles: "Course Coordinator",
        availability: "Full-time",
        skills: "Java, UML",
        credentials: "PhD in SE",
    },
    {
        course: "cybersec",
        name: "",
        previousRoles: "Security Intern",
        availability: "Part-time",
        skills: "Network Security, Python",
        credentials: "BSc in Cyber Security",
    },
    {
        course: "ai",
        name: "",
        previousRoles: "AI Research Assistant",
        availability: "Full-time",
        skills: "TensorFlow, NLP",
        credentials: "MSc in AI",
    },
    {
        course: "webdev",
        name: "",
        previousRoles: "Frontend Developer",
        availability: "Part-time",
        skills: "React, HTML/CSS",
        credentials: "Diploma in Web Dev",
    },
    {
        course: "networks",
        name: "",
        previousRoles: "Lab Technician",
        availability: "Full-time",
        skills: "Cisco, TCP/IP",
        credentials: "BEng in Networking",
    },
    {
        course: "mobileapps",
        name: "",
        previousRoles: "iOS Dev Intern",
        availability: "Part-time",
        skills: "Swift, UI/UX",
        credentials: "BSc in Mobile Computing",
    },
    {
        course: "database",
        name: "",
        previousRoles: "DB Admin",
        availability: "Full-time",
        skills: "SQL, PostgreSQL",
        credentials: "MSc in DB Systems",
    },
    {
        course: "gamedev",
        name: "",
        previousRoles: "Unity Developer",
        availability: "Part-time",
        skills: "Unity, C#",
        credentials: "BSc in Game Design",
    },
];

function createEnrichedApplications(
    tutors: Tutor[],
    applications: Application[]
): ApplicationMap {
    const enriched: ApplicationMap = {};

    tutors.slice(0, applications.length).forEach((tutor, index) => {
        const application = { ...applications[index] };
        const fullName = `${tutor.name ?? ""}`.trim();
        const key = `${tutor.email}`;

        application.name = fullName;

        enriched[key] = application;
    });

    return enriched;
}

function getTutorsFromDummyData(dummy: Record<string, any>): Tutor[] {
    return Object.entries(dummy)
        .filter(([_, user]) => user.type === "tutor")
        .map(([email, user]) => ({
            email,
            name: user.name,
        }));
}

export default function DummyApplications() {
    const dummyData = localStorage.getItem("DummyData");

    if (!dummyData) {
        console.error("No dummy data found in localStorage.");
        return;
    }

    const parsedDummy = JSON.parse(dummyData);
    const tutors = getTutorsFromDummyData(parsedDummy);
    return createEnrichedApplications(tutors, hardcodedApplications);
    //localStorage.setItem("DummyApplications", JSON.stringify(enrichedApps));
}

