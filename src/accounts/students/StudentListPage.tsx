import {
  Box,
  HStack,
  Select,
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
import { useDepartments } from "../../hooks/useDepartments";
import { useMajors } from "../../hooks/useMajors";
import { useStudents } from "../../hooks/useStudents";
import AccessDenyPage from "../../pages/AccessDenyPage";
import SearchBar from "../../pages/searchBar";
import studentFilters from "./studentFilters";
import { hasPermission } from "../../Utilities/hasPermissions";

const StudentListPage = () => {
  const { data: students, error, isLoading } = useStudents();
  const { data: departments } = useDepartments();
  const { data: majors } = useMajors();
  const { handleDepartmentChange, handleMajorChange, setSearchText } =
  studentFilters(departments, majors);
  
  if (!hasPermission("Can view student")) return <AccessDenyPage />;
  if (isLoading)
  return (
<Spinner ml="50%" color="blue.500" thickness="10px" my={60} size="xl" />
    );

  return (
    <>
      <Box ml="48%" fontWeight={500} my={4}>
        Students
      </Box>
      <SearchBar setSearchText={setSearchText} />
      <TableContainer>
        <OverflowYContainer maxH="90vh">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Username</Th>
                <Th>
                  <HStack>
                    <Select onChange={handleMajorChange}>
                      <option>Major</option>
                      {majors?.map((major) => (
                        <option key={major.id}>{major.name}</option>
                      ))}
                      <option>All Majors</option>
                    </Select>
                  </HStack>
                </Th>
                <Th>
                  <HStack>
                    <Select onChange={handleDepartmentChange}>
                      <option>Department</option>
                      {departments?.map((d) => (
                        <option key={d.id}>{d.name}</option>
                      ))}
                      <option>All Departments</option>
                    </Select>
                  </HStack>
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
                      {student.user.username}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={student.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${student.user.id}`}
                    >
                      {student?.major.name}
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
              <Tr>
                <Td fontWeight="bold">Total: {students?.length}</Td>
              </Tr>
            </Tbody>
          </Table>
        </OverflowYContainer>
      </TableContainer>
    </>
  );
};

export default StudentListPage;
