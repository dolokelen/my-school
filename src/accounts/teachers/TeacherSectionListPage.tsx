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
import {
  AUTH_LAYOUT_ROUTE,
  ENROLLMENTS_ROUTE,
  TEACHES_ROUTE,
} from "../../cacheKeysAndRoutes";
import { useTeacherSections } from "../../hooks/useTeaches";
import { useEnrollmentIdStore } from "../../pages/enrollments/enrollmentStore";
import { useTeacherSectionStore } from "./techerSectionStore";

interface Props {
  teacher_id: number;
}

const TeacherSectionListPage = ({ teacher_id }: Props) => {
  const { data: teacherSections, isLoading } = useTeacherSections(teacher_id);
  const setSelectedSectionId = useTeacherSectionStore(
    (s) => s.setSelectedSectionId
  );
  const setSelectedEnrollmentId = useEnrollmentIdStore(
    (s) => s.setSelectedEnrollmentId
  );

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
                setSelectedSectionId(enroll.course.id, enroll.section.id);
                setSelectedEnrollmentId(enroll.id);
              }}
            >
              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${ENROLLMENTS_ROUTE}/${enroll.id}`}
                >
                  {enroll?.course.code}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${ENROLLMENTS_ROUTE}/${enroll.id}`}
                >
                  {enroll?.section.name}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${ENROLLMENTS_ROUTE}/${enroll.id}`}
                >
                  {enroll?.semester.name}
                </Link>
              </Td>

              <Td>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${ENROLLMENTS_ROUTE}/${enroll.id}`}
                >
                  {enroll?.school_year.year}
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TeacherSectionListPage;
