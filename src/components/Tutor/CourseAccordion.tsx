import { IndCourse } from "@/interfaces/Interfaces";
import {
  Stack,
  Title,
  Accordion,
  AccordionItem,
  AccordionControl,
  AccordionPanel,
  Button,
} from "@mantine/core";

interface CredentialProps {
  courses: IndCourse[];
  applyForCourse: (course: IndCourse) => void;
}
const courseAccordion: React.FC<CredentialProps> = ({ courses, applyForCourse }) => {
  return (
    <Stack>
      <Title>Courses</Title>
      <Accordion>
        {courses.map((course, index) => (
          <>
            <AccordionItem value={course.name}>
              <AccordionControl>{course.name}</AccordionControl>
              <AccordionPanel>
                <Stack>
                  {course.courseCode} {course.semester}
                  <Button onClick={() => applyForCourse(course)}>Apply</Button>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </>
        ))}
      </Accordion>
    </Stack>
  );
};

export default courseAccordion

module.exports = courseAccordion