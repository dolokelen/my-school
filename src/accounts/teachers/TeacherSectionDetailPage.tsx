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
import getUserId from "../../Utilities/getUserId";
import { AUTH_LAYOUT_ROUTE, TEACHES_ROUTE } from "../../cacheKeysAndRoutes";
import { useTeacherSections } from "../../hooks/useTeaches";

const TeacherSectionDetailPage = () => {
  const { data: teacherSections, isLoading } = useTeacherSections(getUserId()!);
  if (isLoading) return <Spinner />;

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Student Name</Th>
            <Th>Student Email</Th>
            <Th>Student Phone</Th>
            <Th>Student Status</Th>
            <Th>Course</Th>
            <Th>Section</Th>
            <Th>Semester</Th>
            <Th>School Year</Th>
          </Tr>
        </Thead>
        <Tbody>
          {teacherSections?.map((sec) => (
            <Tr key={sec.id}>
              <Td>
                <Link to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}>
                  {sec?.student.user.first_name} {sec?.student.user.last_name}
                </Link>
              </Td>

              <Td>
                <Link to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}>
                  {sec?.student.user.email}
                </Link>
              </Td>

              <Td>
                <Link to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}>
                  {sec?.student.phone}
                </Link>
              </Td>

              <Td>
                <Link to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}>
                  {sec?.student.level}
                </Link>
              </Td>
              <Td>
                <Link to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}>
                  {sec?.course.code}
                </Link>
              </Td>
              <Td>
                <Link to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}>
                  {sec?.section.name}
                </Link>
              </Td>
              <Td>
                <Link to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}>
                  {sec?.semester.name}
                </Link>
              </Td>
              <Td>
                <Link to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}>
                  {sec?.school_year.year}
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TeacherSectionDetailPage;
