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
import { Link, useLocation } from "react-router-dom";
import { hasPermission } from "../../Utilities/hasPermissions";
import {
  AUTH_LAYOUT_ROUTE,
  ENROLLMENTS_ROUTE,
  STUDENTS_ROUTE,
} from "../../cacheKeysAndRoutes";
import { useEnrollments } from "../../hooks/useEnrollments";
import AccessDenyPage from "../AccessDenyPage";

const EnrollmentListPage = () => {
  const location = useLocation();
  const studentId = parseInt(location.pathname.substring(25, 27));

  const { data: enrollments, isLoading } = useEnrollments(studentId);

  if (!hasPermission("Can view enrollment")) return <AccessDenyPage />;
  if (isLoading) return <Spinner />;

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Student</Th>
            <Th>Course</Th>
            <Th>Section</Th>
            <Th>Semester</Th>
            <Th>School Year</Th>
            <Th>Status</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {enrollments?.map((enrol) => (
            <Tr key={enrol.id}>
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${studentId}/${ENROLLMENTS_ROUTE}/${enrol.id}`}
                >
                  {enrol?.student.user.first_name}{" "}
                  {enrol?.student.user.last_name}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${studentId}/${ENROLLMENTS_ROUTE}/${enrol.id}`}
                >
                  {enrol?.course.code}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${studentId}/${ENROLLMENTS_ROUTE}/${enrol.id}`}
                >
                  {enrol?.section.name}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${studentId}/${ENROLLMENTS_ROUTE}/${enrol.id}`}
                >
                  {enrol?.semester.name}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${studentId}/${ENROLLMENTS_ROUTE}/${enrol.id}`}
                >
                  {enrol?.school_year.year}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${studentId}/${ENROLLMENTS_ROUTE}/${enrol.id}`}
                >
                  {enrol?.status}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${STUDENTS_ROUTE}/${studentId}/${ENROLLMENTS_ROUTE}/${enrol.id}`}
                >
                  {enrol?.date.substring(0, 10)}
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default EnrollmentListPage;
