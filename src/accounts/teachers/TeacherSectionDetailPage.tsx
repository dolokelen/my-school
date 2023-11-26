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
  Text,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import {
  AUTH_LAYOUT_ROUTE,
  TEACHES_ROUTE,
  red,
} from "../../cacheKeysAndRoutes";
import { useTeacherProfile } from "../../hooks/useTeachers";
import {
  useTeacherSectionClassroom,
  useTeacherSectionClasstime,
  useTeacherSectionEnrollments,
} from "../../hooks/useTeaches";
import AssignedSectionEditForm from "../../pages/teaches/AssignedSectionEditFrom";
import GradeUploadPage from "../../pages/grades/GradeUploadPage";
import { hasPermission } from "../../Utilities/hasPermissions";

const TeacherSectionDetailPage = () => {
  const courseId = parseInt(localStorage.getItem("c")!);
  const sectionId = parseInt(localStorage.getItem("s")!);

  const { id } = useParams();
  const enrollmentId = parseInt(id!);

  const { teacherId } = useParams();
  const teacher_id = parseInt(teacherId!);

  const { data: teacher } = useTeacherProfile(teacher_id);
  const { data: classtimes } = useTeacherSectionClasstime(sectionId);
  const { data: classrooms } = useTeacherSectionClassroom(sectionId);
  const { data: teacherSectionStudents, isLoading } =
    useTeacherSectionEnrollments(teacher_id);
  const canChangeTeach = hasPermission("Can change teach");

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
        (sec) => sec.course.id === courseId && sec.section.id === sectionId
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
            {handleSectionStudents().length ? (
              handleSectionStudents()?.map((sec) => (
                <Tr key={sec.id}>
                  <Td>
                    <Link
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}
                    >
                      {sec?.student.user.first_name}{" "}
                      {sec?.student.user.last_name}
                    </Link>
                  </Td>

                  <Td>
                    <Link
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}
                    >
                      {sec?.student.user.email}
                    </Link>
                  </Td>

                  <Td>
                    <Link
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}
                    >
                      {sec?.student.phone}
                    </Link>
                  </Td>

                  <Td>
                    <Link
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}
                    >
                      {sec?.student.level}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}
                    >
                      {sec?.course.code}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}
                    >
                      {sec?.section.name}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}
                    >
                      {sec?.semester.name}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      to={`${AUTH_LAYOUT_ROUTE}/${TEACHES_ROUTE}/${sec.id}`}
                    >
                      {sec?.school_year.year}
                    </Link>
                  </Td>
                </Tr>
              ))
            ) : (
              <Text color={red} ml={6}>
                No enrollment yet
              </Text>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {canChangeTeach && (
        <AssignedSectionEditForm
          enrollmentId={enrollmentId}
          teacherId={teacher_id}
        />
      )}
      <Box mt={12} mb={3}></Box>
      <GradeUploadPage teacherId={teacher_id} teachId={enrollmentId} />
    </>
  );
};

export default TeacherSectionDetailPage;
