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
import { ATTENDANCES_ROUTE, AUTH_LAYOUT_ROUTE } from "../../cacheKeysAndRoutes";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";
import { useAttendances } from "../../hooks/useAttendances";

const AttendanceListPage = () => {
    const { sectionId } = useParams();
    const secId = parseInt(sectionId!);
  const { data: attendances, isLoading } = useAttendances(secId);

  if (!hasPermission("Can view attendance")) return <AccessDenyPage />;
  if (isLoading) return <Spinner />;

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Student</Th>
            <Th>Course</Th>
            <Th>Section</Th>
            <Th>Mark</Th>
            <Th>Comment</Th>
            <Th>Semester</Th>
            <Th>School Year</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {attendances?.map((attend) => (
            <Tr key={attend.id}>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${ATTENDANCES_ROUTE}/${attend.id}`}
                >
                  {attend?.student.user.first_name}{" "}
                  {attend?.student.user.last_name}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${ATTENDANCES_ROUTE}/${attend.id}`}
                >
                  {attend?.course.code}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${ATTENDANCES_ROUTE}/${attend.id}`}
                >
                  {attend.section.name}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${ATTENDANCES_ROUTE}/${attend.id}`}
                >
                  {attend?.mark}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${ATTENDANCES_ROUTE}/${attend.id}`}
                >
                  {attend?.comment ? attend.comment : "No Comment"}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${ATTENDANCES_ROUTE}/${attend.id}`}
                >
                  {attend?.semester.name}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${ATTENDANCES_ROUTE}/${attend.id}`}
                >
                  {attend?.school_year.year}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${ATTENDANCES_ROUTE}/${attend.id}`}
                >
                  {attend?.created_at.substring(0,10)}
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceListPage;
