import {
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DepartmentContact } from "../../hooks/useDepartments";
import { useDepartmentContactStore } from "./departmentStore";

interface Props {
  departmentContacts?: DepartmentContact[];
}

const DepartmentContactListPage = ({ departmentContacts }: Props) => {
  const setSelectedDepartmentContactId = useDepartmentContactStore(
    (s) => s.setSelectedDepartmentContactId
  );
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
            <Tr
              key={contact.id}
              onClick={() => setSelectedDepartmentContactId(contact.id)}
            >
              <Td fontSize={fontSize}><Link>{contact.phone}</Link></Td>
              <Td fontSize={fontSize}><Link>{contact.email}</Link></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DepartmentContactListPage;
