import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import OverflowYContainer from "../../GroupsAndPermissions/OverflowYContainer";
import { TeacherMentee } from "../../hooks/useTeachers";

interface Props {
  mentees?: TeacherMentee[];
}
const TeacherMenteesPage = ({ mentees }: Props) => {
  return (
    <>
      <TableContainer>
        <OverflowYContainer maxH="90vh">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mentees?.map((mentee) => (
                <Tr key={mentee.user.id}>
                  <Td>{mentee.user.first_name}</Td>
                  <Td>{mentee.user.last_name}</Td>
                  <Td>{mentee.user.email}</Td>
                  <Td>{mentee.phone}</Td>
                  <Td>{mentee.level}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </OverflowYContainer>
      </TableContainer>
    </>
  );
};

export default TeacherMenteesPage;
