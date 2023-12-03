import { useLocation } from "react-router-dom";
import getUserId from "../../Utilities/getUserId";
import { useStudentSemesterGrade } from "../../hooks/useGrades";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";

const StudentSemesterGradePage = () => {
  const location = useLocation();

  const schoolYearId = location.search.split("/")[0].substring(1);
  const semesterId = location.search.split("/")[1];

  const { data: grades } = useStudentSemesterGrade(
    getUserId()!,
    parseInt(schoolYearId),
    parseInt(semesterId)
  );

  const handleCommonAttr = () => {
    if (grades?.length) {
      const grade = grades[0];
      const sch_yrd = grade.school_year.year;
      const semester = grade.semester.name;
      const course = grade.course.code;
      const section = grade.section.name;
      const fullName =
        grade.student.user.first_name + " " + grade.student.user.first_name;

      return { sch_yrd, semester, course, section, fullName };
    }
  };

  return (
    <>
      <Text>Student Name: {handleCommonAttr()?.fullName}</Text>
      <Text>School Year: {handleCommonAttr()?.sch_yrd}</Text>
      <Text>Semester: {handleCommonAttr()?.semester}</Text>
      <Text>Course: {handleCommonAttr()?.course}</Text>
      <Text>Section: {handleCommonAttr()?.section}</Text>
      <Text>Total Records: {grades?.length}</Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Course</Th>
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
                <Td>{grade.course.code}</Td>
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
};

export default StudentSemesterGradePage;
