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
import getUserId from "../../Utilities/getUserId";
import { useTeacherProfile } from "../../hooks/useTeachers";
import TeacherMenteesPage from "./TeacherMenteesPage";

const TeacherProfilePage = () => {
  const {
    data: teacher,
    isLoading,
    isError,
    error,
  } = useTeacherProfile(getUserId()!);

  const handleEmployeeTitle = () => {
    if (teacher) return `Prof. ${teacher.user.full_name}`;
  };

  if (isError) throw error;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Grid
        templateAreas={{
          base: `"teacherDetail teacherMentees"`,
        }}
        templateColumns={{
          base: `1fr 1fr`,
        }}
      >
        <GridItem area="teacherDetail">
          <Card maxW="sm">
            <CardBody>
              <Image
                width="100%"
                height="auto"
                objectFit="cover"
                src={teacher?.image}
                alt={teacher?.user.first_name}
                borderRadius="lg"
              />

              <Heading size="md">{handleEmployeeTitle()}</Heading>
              <Text>Username: {teacher?.user.username}</Text>
              <Text>Email: {teacher?.user.email}</Text>
              <Text>Phone: {teacher?.phone}</Text>
              <Text>Gender: {teacher?.gender}</Text>
              <Text>Birth Date: {teacher?.birth_date}</Text>
              <Text>Marital Status: {teacher?.marital_status}</Text>
              <Text>Religion: {teacher?.religion}</Text>
              <Text>Employment Status: {teacher?.employment_status}</Text>
              <Text>Employment Date: {teacher?.joined_at}</Text>
              <Text>
                Account Active? {teacher?.user.is_active ? "Yes" : "No"}
              </Text>
              <Text>
                Highest Education Obtained: {teacher?.level_of_education}
              </Text>
              <Text>Salary: $ {teacher?.salary.toFixed(2)}</Text>
              <Text>
                Office: {teacher?.office.building.name}, office{" "}
                {teacher?.office.id}
              </Text>
              <Text>Department Name: {teacher?.department.name}</Text>
              <Text>
                Supervisor:{" "}
                {teacher?.supervisor?.full_name
                  ? teacher.supervisor.full_name
                  : "None"}
              </Text>
              <Text>
                Term of Reference:{" "}
                <a href={teacher?.term_of_reference} download target="_blank">
                  PDF
                </a>
              </Text>
              <Text>Country: {teacher?.teacheraddress?.country}</Text>
              <Text>County: {teacher?.teacheraddress?.county}</Text>
              <Text>City: {teacher?.teacheraddress?.city}</Text>
              <Text>District: {teacher?.teacheraddress?.district}</Text>
              <Text>Community: {teacher?.teacheraddress?.community}</Text>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem area="teacherMentees"></GridItem>
      </Grid>
      {teacher?.mentees.length !== 0 ? (
        <>
          <Box ml="20%" fontWeight={500} my={4} fontSize={25} mt={20}>
            {`Prof. ${teacher?.user.last_name}'s Mentees`}
          </Box>
          <TeacherMenteesPage mentees={teacher?.mentees} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TeacherProfilePage;
