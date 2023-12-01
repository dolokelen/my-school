import {
  Box,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { hasPermission } from "../../Utilities/hasPermissions";
import { red } from "../../cacheKeysAndRoutes";
import { useTeacherProfile } from "../../hooks/useTeachers";
import {
  useTeacherSectionClassroom,
  useTeacherSectionClasstime,
  useTeacherSectionEnrollments,
} from "../../hooks/useTeaches";
import GradeUploadPage from "../../pages/grades/GradeUploadPage";
import TeacherSectionGradeListPage from "../../pages/grades/TeacherSectionGradeListPage";
import AssignedSectionEditForm from "../../pages/teaches/AssignedSectionEditFrom";

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
              {/* <Th>Student Email</Th> */}
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
                    {sec?.student.user.first_name} {sec?.student.user.last_name}
                  </Td>
                  {/* <Td>{sec?.student.user.email}</Td> */}
                  <Td>{sec?.student.phone}</Td>
                  <Td>{sec?.student.level}</Td>
                  <Td>{sec?.course.code}</Td>
                  <Td>{sec?.section.name}</Td>
                  <Td>{sec?.semester.name}</Td>
                  <Td>{sec?.school_year.year}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td color={red} ml={6}>
                  No enrollment yet.
                </Td>
              </Tr>
            )}
            <Tr>
              <Td fontWeight="bold">Students: {handleSectionStudents()?.length}</Td>
            </Tr>
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
      <Box mt={20}>
        <Heading size="md" ml="40%" mb={3}>
          Students Grades
        </Heading>
        <TeacherSectionGradeListPage
          teacherId={teacher_id}
          teachId={enrollmentId}
        />
      </Box>
    </>
  );
};

export default TeacherSectionDetailPage;
