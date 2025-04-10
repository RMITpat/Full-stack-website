// this needs to be able to parse what lecturehomepage uses to write applications into
// an array of user emails for Course applications
// it needs to order those emails by the properties of the user
import {DetailValues} from "@/interfaces/Interfaces";
import {ReactNode} from "react";

export default function OrderApplications
(applicants: DetailValues[]): ReactNode {

    const emails: string[] = [];
    for (let i = 0; i < applicants.length; i++) {
        emails.push(applicants[i].email);
    }

    return (
        <>
            {emails.map((email, index) => (
                <p key={index}>{email}</p>
            ))}
        </>
    );

}
