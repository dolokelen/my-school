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
import { AUTH_LAYOUT_ROUTE, CLASSROOMS_ROUTE } from "../../cacheKeysAndRoutes";
import { useClassrooms } from "../../hooks/useClassrooms";

const ClassroomListPage = () => {
  const { data: classrooms, isLoading } = useClassrooms();

  if (isLoading) return <Spinner />;

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Dimension</Th>
            <Th>Building</Th>
            <Th>Assigned Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {classrooms?.map((classroom) => (
            <Tr key={classroom.id}>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${CLASSROOMS_ROUTE}/${classroom.id}`}
                >
                  {classroom?.name}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${CLASSROOMS_ROUTE}/${classroom.id}`}
                >
                  {classroom?.dimension}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${CLASSROOMS_ROUTE}/${classroom.id}`}
                >
                  {classroom?.building.name}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${CLASSROOMS_ROUTE}/${classroom.id}`}
                >
                  {classroom?.created_at}
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ClassroomListPage;
