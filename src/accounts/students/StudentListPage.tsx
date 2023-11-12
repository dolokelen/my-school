import {
  Box,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import OverflowYContainer from "../../GroupsAndPermissions/OverflowYContainer";
import { AUTH_LAYOUT_ROUTE, STUDENTS_ROUTE } from "../../cacheKeysAndRoutes";
import { useStudents } from "../../hooks/useStudents";
import AccessDenyPage from "../../pages/AccessDenyPage";

const StudentListPage = () => {
  const { data: students, error, isLoading } = useStudents();

  if (error) {
    const unAuthorized = "Request failed with status code 403";
    if (error.message === unAuthorized) return <AccessDenyPage />;
    else throw error;
  }

  if (isLoading)
    return (
      <Spinner ml="50%" color="blue.500" thickness="10px" my={60} size="xl" />
    );

  // const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedDepartmentId = departments?.find(
  //     (d) => d.name === e.target.value
  //   )?.id;
  //   setSelectedDepartmentId(selectedDepartmentId);
  // };

  return (
    <>
      <Box ml="48%" fontWeight={500} my={4}>
        Students
      </Box>
      <TableContainer>
        <OverflowYContainer maxH="90vh">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Username</Th>
                <Th>
                  {/* <HStack>
                      <Select onChange={handleDepartmentChange}>
                        <option>Department</option>
                        {departments?.map((d) => (
                          <option key={d.id}>{d.name}</option>
                        ))}
                        <option>All Departments</option>
                      </Select>
                    </HStack> */}
                  Department
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {students?.map((student) => (
                <Tr key={student.user.id}>
                  <Td>
                    <Link
                      key={student.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${student.user.id}`}
                    >
                      {student.user.first_name}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={student.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${student.user.id}`}
                    >
                      {student.user.last_name}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={student.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${student.user.id}`}
                    >
                      {student.user.email}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={student.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${student.user.id}`}
                    >
                      {student.phone}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={student.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${student.user.id}`}
                    >
                      {student.user.username}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={student.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${student.user.id}`}
                    >
                      {student.department.name}
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </OverflowYContainer>
      </TableContainer>
    </>
  );
};

export default StudentListPage;
