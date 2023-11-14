import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BuildingClassroom } from "../../hooks/useBuildings";

interface Props {
  classrooms?: BuildingClassroom[];
}
const BuildingClassroomListPage = ({ classrooms }: Props) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Dimension</Th>
          </Tr>
        </Thead>
        <Tbody>
          {classrooms?.map((classroom) => (
            <Tr key={classroom.id}>
              <Td>{classroom?.name}</Td>
              <Td>{classroom?.dimension}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BuildingClassroomListPage;
