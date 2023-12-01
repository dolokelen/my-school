import {
  Box,
  Flex,
  Spinner,
  Table,
  TableCaption,
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

  const handleSchoolYear = () => {
    if (enrollments?.length) {
      const enrollment = enrollments[0];
      return enrollment.school_year.year;
    }
    return "";
  };

  const handleSemester = () => {
    if (enrollments?.length) {
      const enrollment = enrollments[0];
      return enrollment.semester.name;
    }
    return "";
  };

  const handleDate = () => {
    if (enrollments?.length) {
      const enrollment = enrollments[0];
      return enrollment.date.substring(0,10);
    }
    return "";
  };

  const handleCalcTotalPrice = () => {
    if (enrollments?.length) {
      const amounts = enrollments.map((e) => e.credit * e.price_per_credit);
      const initialAmount = 0;
      return amounts.reduce((acc, amount) => acc + amount, initialAmount);
    }
    return 0;
  };

  return (
    <>
      <Text mt={9}>Student: {handleStudentName()}</Text>
      <Text>School Year: {handleSchoolYear()}</Text>
      <Text>Semester: {handleSemester()}</Text>
      <Text>Date: {handleDate()}</Text>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            <Flex justifyContent="space-around" fontSize={16}>
              <Box>Total Sections: {enrollments?.length}</Box>
              <Box>Total Price: $ {handleCalcTotalPrice().toFixed(2)}</Box>
            </Flex>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Course</Th>
              <Th>Section</Th>
              <Th>Status</Th>
              <Th>Price Per Credit</Th>
              <Th>Credits</Th>
            </Tr>
          </Thead>
          <Tbody>
            {enrollments?.map((enrol) => (
              <Tr key={enrol.id}>
                <Td>{enrol?.course.code}</Td>
                <Td>{enrol?.section.name}</Td>
                <Td>{enrol?.status}</Td>
                <Td>$ {enrol?.price_per_credit.toFixed(2)}</Td>
                <Td>{enrol?.credit}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentEnrollmentListPage;
