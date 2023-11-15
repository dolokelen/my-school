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
import { AUTH_LAYOUT_ROUTE, SECTIONS_ROUTE } from "../../cacheKeysAndRoutes";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";
import { useSections } from "../../hooks/useSections";

const SectionListPage = () => {
  const { data: sections, isLoading } = useSections();

  if (!hasPermission("Can view section")) return <AccessDenyPage />;
  if (isLoading) return <Spinner />;

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Course Code</Th>
            <Th>Section Name</Th>
            <Th>Class Time</Th>
            <Th>Class Room</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sections?.map((section) => (
            <Tr key={section.id}>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${SECTIONS_ROUTE}/${section.id}`}
                >
                  {section?.course.code}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${SECTIONS_ROUTE}/${section.id}`}
                >
                  {section?.name}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${SECTIONS_ROUTE}/${section.id}`}
                >
                  {section?.classtime.start_time} -{" "}
                  {section?.classtime.end_time}, {section?.classtime.week_days}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${SECTIONS_ROUTE}/${section.id}`}
                >
                  {section?.classroom.name}
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SectionListPage;
