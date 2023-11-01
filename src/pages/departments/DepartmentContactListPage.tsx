import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DepartmentContact, useDepartments } from "../../hooks/useDepartments";
import { Link } from "react-router-dom";
import { AUTH_LAYOUT_ROUTE, DEPARTMENTS_ROUTE } from "../../cacheKeysAndRoutes";

interface Props {
  departmentContacts?: DepartmentContact[];
}

const DepartmentContactListPage = ({ departmentContacts }: Props) => {
  const fontSize = "1rem";

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Phone</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {departmentContacts?.map((contact) => (
            <Tr key={contact.id}>
              <Td fontSize={fontSize}>
               {contact.phone}
              </Td>
              <Td fontSize={fontSize}>
                {contact.email}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DepartmentContactListPage;
