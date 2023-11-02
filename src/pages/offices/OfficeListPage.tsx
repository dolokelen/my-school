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
import { AUTH_LAYOUT_ROUTE, OFFICES_ROUTE } from "../../cacheKeysAndRoutes";
import { useOffices } from "../../hooks/useOffices";
  
  const OfficeListPage = () => {
    const { data: offices, isLoading } = useOffices();
  
    if (isLoading) return <Spinner />;
  
    return (
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Dimension</Th>
              <Th>Building</Th>
            </Tr>
          </Thead>
          <Tbody>
            {offices?.map((office) => (
              <Tr key={office.id}>
                <Td>
                  <Link
                    to={`${AUTH_LAYOUT_ROUTE}/${OFFICES_ROUTE}/${office.id}`}
                  >
                    {office.dimension}
                  </Link>
                </Td>
                <Td>
                  <Link
                    to={`${AUTH_LAYOUT_ROUTE}/${OFFICES_ROUTE}/${office.id}`}
                  >
                    {office.building.name}
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };
  
  export default OfficeListPage;
  