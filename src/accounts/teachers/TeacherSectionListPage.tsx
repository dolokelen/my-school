import {
  Heading,
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
import { AUTH_LAYOUT_ROUTE, TEACHES_ROUTE } from "../../cacheKeysAndRoutes";
import { useTeacherSections } from "../../hooks/useTeaches";

interface Props {
  teacher_id: number;
  full_name: string;
}
const TeacherSectionListPage = ({ teacher_id, full_name }: Props) => {
  const { data: teacherSections, isLoading } = useTeacherSections(teacher_id);
  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading size="md" my={4}>
        {full_name} Assigned Sections
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
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
    </>
  );
};

export default TeacherSectionListPage;
