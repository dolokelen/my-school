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
import { AUTH_LAYOUT_ROUTE, TEACHERS_ROUTE } from "../../cacheKeysAndRoutes";
import AccessDenyPage from "../../pages/AccessDenyPage";
import { useTeachers } from "../../hooks/useTeachers";
import { useDepartments } from "../../hooks/useDepartments";
import { useTeacherStore } from "./teacherStore";

const TeacherListPage = () => {
  const { data: teachers, error, isLoading } = useTeachers();
  const { data: departments } = useDepartments();
  const setSelectedDepartmentId = useTeacherStore(
    (s) => s.setSelectedDepartmentId
  );

  if (error) {
    const unAuthorized = "Request failed with status code 403";
    if (error.message === unAuthorized) return <AccessDenyPage />;
    else throw error;
  }
  if (isLoading)
    return (
      <Spinner ml="50%" color="blue.500" thickness="10px" my={60} size="xl" />
    );

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDepartmentId = departments?.find(
      (d) => d.name === e.target.value
    )?.id;
    setSelectedDepartmentId(selectedDepartmentId);
  };

  return (
    <>
      <Box ml="48%" fontWeight={500} my={4}>
        Teachers
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
              {teachers?.map((teacher) => (
                <Tr key={teacher.user.id}>
                  <Td>
                    <Link
                      key={teacher.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHERS_ROUTE}/${teacher.user.id}`}
                    >
                      {teacher.user.first_name}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={teacher.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHERS_ROUTE}/${teacher.user.id}`}
                    >
                      {teacher.user.last_name}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={teacher.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHERS_ROUTE}/${teacher.user.id}`}
                    >
                      {teacher.user.email}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={teacher.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHERS_ROUTE}/${teacher.user.id}`}
                    >
                      {teacher.phone}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={teacher.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHERS_ROUTE}/${teacher.user.id}`}
                    >
                      {teacher.user.username}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={teacher.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHERS_ROUTE}/${teacher.user.id}`}
                    >
                      {teacher.department.name}
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

export default TeacherListPage;
