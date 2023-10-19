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
import { Link, useParams } from "react-router-dom";
import { AUTH_LAYOUT_ROUTE, USER_ROUTE } from "../../cacheKeysAndRoutes";
import { useUsers } from "../../hooks/useUsers";

const UsersListPage = () => {
  const { data: users, error, isLoading } = useUsers();
  const { id } = useParams();
  const userId = parseInt(id!);

  if (error) throw error;
  if (isLoading) return <Spinner ml="50%" color="blue.500" thickness="10px" my={60} size="xl" />;

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>Username</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>
                <Link
                  key={user.id}
                  to={`${AUTH_LAYOUT_ROUTE}/${USER_ROUTE}/${user.id}`}
                >
                  {user.first_name}
                </Link>
              </Td>
              <Td>
                <Link
                  key={user.id}
                  to={`${AUTH_LAYOUT_ROUTE}/${USER_ROUTE}/${user.id}`}
                >
                  {user.last_name}
                </Link>
              </Td>
              <Td>
                <Link
                  key={user.id}
                  to={`${AUTH_LAYOUT_ROUTE}/${USER_ROUTE}/${user.id}`}
                >
                  {user.email}
                </Link>
              </Td>
              <Td>
                <Link
                  key={user.id}
                  to={`${AUTH_LAYOUT_ROUTE}/${USER_ROUTE}/${user.id}`}
                >
                  {user.username}
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UsersListPage;
