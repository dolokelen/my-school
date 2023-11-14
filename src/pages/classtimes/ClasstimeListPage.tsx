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
import { useClasstimes } from "../../hooks/useClasstimes";
import { AUTH_LAYOUT_ROUTE, CLASSTIMES_ROUTE } from "../../cacheKeysAndRoutes";

const ClasstimeListPage = () => {
  const { data: classtimes, isLoading } = useClasstimes();

  if (isLoading) return <Spinner />;

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Start Time</Th>
            <Th>End Time</Th>
            <Th>Week Days</Th>
          </Tr>
        </Thead>
        <Tbody>
          {classtimes?.map((classtime) => (
            <Tr key={classtime.id}>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${CLASSTIMES_ROUTE}/${classtime.id}`}
                >
                  {classtime?.start_time}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${CLASSTIMES_ROUTE}/${classtime.id}`}
                >
                  {classtime?.end_time}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${CLASSTIMES_ROUTE}/${classtime.id}`}
                >
                  {classtime?.week_days}
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ClasstimeListPage;
