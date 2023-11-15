import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AUTH_LAYOUT_ROUTE, SEMESTERS_ROUTE } from "../../cacheKeysAndRoutes";
import { useSemesters } from "../../hooks/useSemesters";
import { useSemesterseStore } from "./semesterStore";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

const SemesterListPage = () => {
  if (!hasPermission("Can view semester")) return <AccessDenyPage />;

  const { data: semesters, isLoading } = useSemesters();
  const setOrdering = useSemesterseStore((s) => s.setOrdering);
  const [sortOrdering, setSortOrder] = useState(false);

  if (isLoading) return <Spinner />;

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th
              borderRadius={20}
              _hover={{
                transform: "scale(1.03)",
                transition: "transform .15s ease-in",
                cursor: "pointer",
              }}
              bgColor="gray.200"
              onClick={() => {
                sortOrdering ? setOrdering("-name") : setOrdering("name");
                setSortOrder(!sortOrdering);
              }}
            >
              Semester name*
            </Th>
            <Th>School year</Th>
            <Th>Register start date</Th>
            <Th>Register end date</Th>
            <Th>Semester start date</Th>
            <Th>Semester end date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {semesters?.map((semester) => (
            <Tr key={semester.id}>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${SEMESTERS_ROUTE}/${semester.id}`}
                >
                  {semester.is_current ? (
                    <Badge colorScheme="green">{semester.name}</Badge>
                  ) : (
                    semester.name
                  )}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${SEMESTERS_ROUTE}/${semester.id}`}
                >
                  {semester.school_year.year}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${SEMESTERS_ROUTE}/${semester.id}`}
                >
                  {semester.enrollment_start_date}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${SEMESTERS_ROUTE}/${semester.id}`}
                >
                  {semester.enrollment_end_date}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${SEMESTERS_ROUTE}/${semester.id}`}
                >
                  {semester.start_date}
                </Link>
              </Td>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${SEMESTERS_ROUTE}/${semester.id}`}
                >
                  {semester.end_date}
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SemesterListPage;
