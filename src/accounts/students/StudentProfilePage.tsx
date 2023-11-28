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
import getUserId from "../../Utilities/getUserId";
import { useStudentProfile } from "../../hooks/useStudents";
import SchYearAndSemesterSelectionForm from "../../pages/grades/SchYearAndSemesterSelectionForm";

const StudentProfilePage = () => {
  const studentId = getUserId()!;
  const {
    data: student,
    isLoading,
    isError,
    error,
  } = useStudentProfile(studentId);

  if (isLoading) return <Spinner />;
  if (isError) throw error;
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
          <SchYearAndSemesterSelectionForm studentId={studentId} />
        </GridItem>
      </Grid>
    </>
  );
};

export default StudentProfilePage;
