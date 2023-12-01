import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSectionGrades } from "../../hooks/useGrades";

interface Props {
  teacherId: number;
  teachId: number;
}
const TeacherSectionGradeListPage = ({ teacherId, teachId }: Props) => {
  const { data: grades } = useSectionGrades(teacherId, teachId);

  const handleCommonAttr = () => {
    if (grades) {
      const grade = grades[0];
      const sch_yrd = grade.school_year.year;
      const semester = grade.semester.name;
      const course = grade.course.code;
      const section = grade.section.name;
      const date = grade.graded_at;

      return { sch_yrd, semester, course, section, date };
    }
  };
  
if (grades?.length)
  return (
    <>
      <Text>School Year: {handleCommonAttr()?.sch_yrd}</Text>
      <Text>Semester: {handleCommonAttr()?.semester}</Text>
      <Text>Course: {handleCommonAttr()?.course}</Text>
      <Text>Section: {handleCommonAttr()?.section}</Text>
      <Text>Total Records: {grades?.length}</Text>
      <Text>Date: {handleCommonAttr()?.date.substring(0, 10)}</Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Student</Th>
              <Th>Attent.</Th>
              <Th>Assign.</Th>
              <Th>Quiz</Th>
              <Th>Midterm</Th>
              <Th>Proj.</Th>
              <Th>Final</Th>
              <Th>Total</Th>
              <Th>Grade Point</Th>
              <Th>Letter</Th>
            </Tr>
          </Thead>
          <Tbody>
            {grades?.map((grade) => (
              <Tr key={grade.id}>
                <Td>
                  {grade.student.user.first_name} {grade.student.user.last_name}
                </Td>
                <Td>{grade.attendance}</Td>
                <Td>{grade.assignment}</Td>
                <Td>{grade.quiz}</Td>
                <Td>{grade.midterm}</Td>
                <Td>{grade.project}</Td>
                <Td>{grade.final}</Td>
                <Td>{grade.total_score}</Td>
                <Td>{grade.grade_point}</Td>
                <Td>{grade.letter}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
  return <></>
};

export default TeacherSectionGradeListPage;
