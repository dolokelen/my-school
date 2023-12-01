import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import getUserId from "../../Utilities/getUserId";
import { useEnrollments } from "../../hooks/useEnrollments";

const StudentEnrollmentListPage = () => {
  const { data: enrollments, isLoading } = useEnrollments(getUserId()!);

  if (isLoading) return <Spinner />;

  const handleStudentName = () => {
    if (enrollments?.length) {
      const student = enrollments[0].student?.user;

      return `${student.first_name} ${student.last_name}`;
    }
    return "";
  };

  return (
    <>
      <Text mt={9} ml={6}>
        Student: {handleStudentName()}
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Course</Th>
              <Th>Section</Th>
              <Th>Semester</Th>
              <Th>School Year</Th>
              <Th>Status</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {enrollments?.map((enrol) => (
              <Tr key={enrol.id}>
                <Td>{enrol?.course.code}</Td>

                <Td>{enrol?.section.name}</Td>

                <Td>{enrol?.semester.name}</Td>

                <Td>{enrol?.school_year.year}</Td>

                <Td>{enrol?.status}</Td>

                <Td>{enrol?.date.substring(0, 10)}</Td>
              </Tr>
            ))}
            <Tr>
              <Td>Total: {enrollments?.length}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentEnrollmentListPage;
