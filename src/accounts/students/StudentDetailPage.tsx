import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { hasPermission } from "../../Utilities/hasPermissions";
import {
  ENROLLMENTS_CREATE_ROUTE,
  ENROLLMENTS_ROUTE,
} from "../../cacheKeysAndRoutes";
import { useStudent } from "../../hooks/useStudents";
import AccessDenyPage from "../../pages/AccessDenyPage";
import { useStudentEnrollmentStore } from "../../pages/enrollments/enrollmentStore";
import UserGroupsPage from "../../pages/users/UserGroupsPage";
import StudentEditForm from "./StudentEditForm";

const StudentDetailPage = () => {
  const { id } = useParams();
  const studentId = parseInt(id!);
  const { data: student, isLoading } = useStudent(studentId);
  const canChangeStudent = hasPermission("Can change student");
  const canEnrollStudent = hasPermission("Can add enrollment");
  const { setSelectedStudentId } = useStudentEnrollmentStore();

  useEffect(() => {
    if (studentId) setSelectedStudentId(studentId);
  }, [studentId]);

  if (!hasPermission("Can view student")) return <AccessDenyPage />;
  if (isLoading) return <Spinner />;
  return (
    <>
      <Grid
        templateAreas={{
          base: `"studentDetail studentGroups"`,
        }}
        templateColumns={{
          base: `1fr 1.8fr`,
        }}
      >
        <GridItem area="studentDetail">
          <Card maxW="sm">
            <CardBody>
              <Image
                width="100%"
                height="auto"
                objectFit="cover"
                src={student?.image}
                alt={student?.user.first_name}
                borderRadius="lg"
              />
              <Heading size="md">{student?.user.full_name}</Heading>
              <Text>Student ID: {student?.student_number}</Text>
              <Text>Username: {student?.user.username}</Text>
              <Text>Email: {student?.user.email}</Text>
              <Text>Phone: {student?.phone}</Text>
              <Text>Gender: {student?.gender}</Text>
              <Text>Birth Date: {student?.birth_date}</Text>
              <Text>Religion: {student?.religion}</Text>
              <Text>Registration Date: {student?.joined_at}</Text>
              <Text>
                Registration Fee: $ {student?.registration_fee.toFixed(2)}
              </Text>
              <Text>Status: {student?.level}</Text>
              <Text>
                Is Transfer Student: {student?.is_transfer ? "Yes" : "No"}
              </Text>
              <Text>
                Account Active? {student?.user.is_active ? "Yes" : "No"}
              </Text>
              <Text>Department Name: {student?.department.name}</Text>
              <Text>Major: {student?.major.name}</Text>
              <Text>Supervisor: {student?.supervisor.full_name}</Text>
              <Text>Country: {student?.studentaddress?.country}</Text>
              <Text>County: {student?.studentaddress?.county}</Text>
              <Text>City: {student?.studentaddress?.city}</Text>
              <Text>District: {student?.studentaddress?.district}</Text>
              <Text>Community: {student?.studentaddress?.community}</Text>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem area="studentGroups">
          <UserGroupsPage userPk={studentId} />
          <Box mt={8} ml={20} color="blue.500">
            <Link to={ENROLLMENTS_ROUTE}>Student Enrollments</Link>
          </Box>
          {canEnrollStudent && (
            <Box mt={8} ml={20} color="blue.500">
              <Link to={ENROLLMENTS_CREATE_ROUTE}>Enroll Student</Link>
            </Box>
          )}
        </GridItem>
      </Grid>
      {canChangeStudent && <StudentEditForm student={student} />}
    </>
  );
};

export default StudentDetailPage;
