import { Dispatch, SetStateAction } from "react"
import { Course } from "../interfaces/Interfaces"

interface tutorHomePageProps {
  courses: Course[]
  setCourses: Dispatch<SetStateAction<Course[]>>
}


const lecturerHomePage: React.FC<tutorHomePageProps> = ({ courses, setCourses }) => {



    return (
        <>
        {courses.map((course, index) => (
            <li key={index}>{course.name}{course.courseCode}{course.semester}
            {course.applicants.map((applicant, index) => (
            <li key={index}>{applicant.name}</li>
            ))}
            </li>
        ))}
        
        </>
    )

}

export default lecturerHomePage