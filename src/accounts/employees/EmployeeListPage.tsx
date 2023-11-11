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
import { AUTH_LAYOUT_ROUTE, EMPLOYEES_ROUTE } from "../../cacheKeysAndRoutes";
import { useEmployees } from "../../hooks/useEmployees";
import AccessDenyPage from "../../pages/AccessDenyPage";
import { useDepartments } from "../../hooks/useDepartments";
import { useEmployeeStore } from "./employeeStore";

const EmployeeListPage = () => {
  const { data: employees, error, isLoading } = useEmployees();
  const { data: departments } = useDepartments();
  const setSelectedDepartmentId = useEmployeeStore(
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
        Employees
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
              {employees?.map((employee) => (
                <Tr key={employee.user.id}>
                  <Td>
                    <Link
                      key={employee.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${EMPLOYEES_ROUTE}/${employee.user.id}`}
                    >
                      {employee.user.first_name}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={employee.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${EMPLOYEES_ROUTE}/${employee.user.id}`}
                    >
                      {employee.user.last_name}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={employee.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${EMPLOYEES_ROUTE}/${employee.user.id}`}
                    >
                      {employee.user.email}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={employee.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${EMPLOYEES_ROUTE}/${employee.user.id}`}
                    >
                      {employee.phone}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={employee.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${EMPLOYEES_ROUTE}/${employee.user.id}`}
                    >
                      {employee.user.username}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      key={employee.user.id}
                      to={`${AUTH_LAYOUT_ROUTE}/${EMPLOYEES_ROUTE}/${employee.user.id}`}
                    >
                      {employee.department.name}
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

export default EmployeeListPage;
