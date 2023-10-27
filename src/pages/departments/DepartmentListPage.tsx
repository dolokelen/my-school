import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useDepartments } from "../../hooks/useDepartments";
import { Link } from "react-router-dom";
import { AUTH_LAYOUT_ROUTE, DEPARTMENTS_ROUTE } from "../../cacheKeysAndRoutes";

const DepartmentListPage = () => {
  const { data: departments } = useDepartments();
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Budget</Th>
            <Th>Duty in Brief</Th>
          </Tr>
        </Thead>
        <Tbody>
          {departments?.map((departm) => (
            <Tr key={departm.id}>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${DEPARTMENTS_ROUTE}/${departm.id}`}
                >
                  {departm.name}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${DEPARTMENTS_ROUTE}/${departm.id}`}
                >
                  $ {departm.budget.toFixed(2)}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${DEPARTMENTS_ROUTE}/${departm.id}`}
                >
                  {departm.duty}...
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DepartmentListPage;
