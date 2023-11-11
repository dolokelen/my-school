import {
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
import { AUTH_LAYOUT_ROUTE, MAJORS_ROUTE } from "../../cacheKeysAndRoutes";
import { useMajors } from "../../hooks/useMajors";

const MajorListPage = () => {
  const { data: majors, error, isLoading } = useMajors();

  if (error) throw error;

  if (isLoading)
    return (
      <Spinner ml="50%" color="blue.500" thickness="10px" my={60} size="xl" />
    );

  return (
    <TableContainer>
      <OverflowYContainer maxH="90vh">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Major Name</Th>
              <Th>Major Department</Th>
            </Tr>
          </Thead>
          <Tbody>
            {majors?.map((major) => (
              <Tr key={major.id}>
                <Td>
                  <Link
                    key={major.id}
                    to={`${AUTH_LAYOUT_ROUTE}/${MAJORS_ROUTE}/${major.id}`}
                  >
                    {major.name}
                  </Link>
                </Td>
                <Td>
                  <Link
                    key={major.id}
                    to={`${AUTH_LAYOUT_ROUTE}/${MAJORS_ROUTE}/${major.id}`}
                  >
                    {major.department.name}
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </OverflowYContainer>
    </TableContainer>
  );
};

export default MajorListPage;
