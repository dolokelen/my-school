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
import { useBuildings } from "../../hooks/useBuildings";
import { AUTH_LAYOUT_ROUTE, BUILDINGS_ROUTE } from "../../cacheKeysAndRoutes";

const BuildingListPage = () => {
  const { data: buildings, isLoading } = useBuildings();

  if (isLoading) return <Spinner />;

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Dimension</Th>
            <Th>Offices</Th>
            <Th>Classrooms</Th>
            <Th>Latrines</Th>
            <Th>Construction Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {buildings?.map((building) => (
            <Tr key={building.id}>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${BUILDINGS_ROUTE}/${building.id}`}
                >
                  {building.name}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${BUILDINGS_ROUTE}/${building.id}`}
                >
                  {building.dimension}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${BUILDINGS_ROUTE}/${building.id}`}
                >
                  {building.office_counts}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${BUILDINGS_ROUTE}/${building.id}`}
                >
                  {building.classroom_counts}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${BUILDINGS_ROUTE}/${building.id}`}
                >
                  {building.toilet_counts}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${BUILDINGS_ROUTE}/${building.id}`}
                >
                  {building.date_constructed}
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BuildingListPage;
