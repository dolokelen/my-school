import {
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  AUTH_LAYOUT_ROUTE,
  ENROLLMENTS_ROUTE,
  TEACHES_ROUTE,
} from "../../cacheKeysAndRoutes";
import { useTeacherSections } from "../../hooks/useTeaches";

interface Props {
  teacher_id: number;
}

const TeacherSectionListPage = ({ teacher_id }: Props) => {
  const navigate = useNavigate();
  const { data: teacherSections, isLoading } = useTeacherSections(teacher_id);

  if (isLoading) return <Spinner />;

  return (
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
          {teacherSections?.map((enroll) => (
            <Tr
              key={enroll.id}
              onClick={() => {
                navigate(
                  `${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${teacher_id}/${ENROLLMENTS_ROUTE}/${enroll.id}/`
                );
                localStorage.setItem("c", enroll.course.id.toString());
                localStorage.setItem("s", enroll.section.id.toString());
              }}
            >
              <Td>
                <Link>{enroll?.course.code}</Link>
              </Td>
              <Td>
                <Link>{enroll?.section.name}</Link>
              </Td>
              <Td>
                <Link>{enroll?.semester.name}</Link>
              </Td>
              <Td>
                <Link>{enroll?.school_year.year}</Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TeacherSectionListPage;
