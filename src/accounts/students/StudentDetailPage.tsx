import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { hasPermission } from "../../Utilities/hasPermissions";
import UserGroupsPage from "../../pages/users/UserGroupsPage";
import { useStudent } from "../../hooks/useStudents";
import StudentEditForm from "./StudentEditForm";

const StudentDetailPage = () => {
  const { id } = useParams();
  const studentId = parseInt(id!);
  const { data: student, isLoading } = useStudent(studentId);
  const canChangeStudent = hasPermission("Can change student");

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
        </GridItem>
      </Grid>
      {canChangeStudent && <StudentEditForm student={student} />}
    </>
  );
};

export default StudentDetailPage;
