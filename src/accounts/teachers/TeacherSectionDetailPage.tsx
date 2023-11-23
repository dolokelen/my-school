import {
  Box,
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
import {
  useTeacherSectionClassroom,
  useTeacherSectionClasstime,
  useTeacherSectionEnrollments,
} from "../../hooks/useTeaches";
import { useTeacherIdStore } from "./teacherStore";
import { useTeacherSectionStore } from "./techerSectionStore";
import { useTeacherProfile } from "../../hooks/useTeachers";

const TeacherSectionDetailPage = () => {
  const teacherId = useTeacherIdStore(
    (s) => s.teacherIdQuery.selectedTeacherId
  );
  const { data: teacherSectionStudents, isLoading } =
    useTeacherSectionEnrollments(teacherId!);
  const selectedSectionId = useTeacherSectionStore(
    (s) => s.sectionQuery.selectedSectionId
  );
  const selectedCourseId = useTeacherSectionStore(
    (s) => s.sectionQuery.selectedCourseId
  );
  const { data: teacher } = useTeacherProfile(teacherId!);
  const { data: classtimes } = useTeacherSectionClasstime(selectedSectionId!);
  const { data: classrooms } = useTeacherSectionClassroom(selectedSectionId!);

  const handleClasstime = () => {
    if (classtimes) {
      const { start_time, end_time, week_days } = classtimes[0];
      const classtime = start_time + " - " + end_time + ", " + week_days;
      return classtime;
    }
    return "";
  };

  const handleClassroom = () => {
    if (classrooms) {
      const { name, building } = classrooms[0];
      const classroom = building.name + ", " + name;
      return classroom;
    }
    return "";
  };

  const handleSectionStudents = () => {
    if (teacherSectionStudents) {
      const students = teacherSectionStudents.filter(
        (sec) =>
          sec.course.id === selectedCourseId &&
          sec.section.id === selectedSectionId
      );
      return students;
    }
    return [];
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading size="md">Prof. {teacher && teacher.user.full_name}</Heading>
      <Box>Class Time: {handleClasstime()}</Box>
      <Box mb={4}>Class Room: {handleClassroom()}</Box>
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
            {handleSectionStudents()?.map((sec) => (
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
    </>
  );
};

export default TeacherSectionDetailPage;
