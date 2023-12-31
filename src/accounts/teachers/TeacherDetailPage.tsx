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
import { Link, useParams } from "react-router-dom";
import OverflowYContainer from "../../GroupsAndPermissions/OverflowYContainer";
import { hasPermission } from "../../Utilities/hasPermissions";
import { AUTH_LAYOUT_ROUTE, SECTION_ASSIGNMENT_ROUTE, TEACHERS_ROUTE, TEACHES_CREATE_ROUTE } from "../../cacheKeysAndRoutes";
import { useTeacher } from "../../hooks/useTeachers";
import AccessDenyPage from "../../pages/AccessDenyPage";
import UserGroupsPage from "../../pages/users/UserGroupsPage";
import TeacherEditForm from "./TeacherEditForm";
import TeacherMenteesPage from "./TeacherMenteesPage";
import TeacherSectionListPage from "./TeacherSectionListPage";

const TeacherDetailPage = () => {
  const { id } = useParams();
  const teacherId = parseInt(id!);
  const { data: teacher, isLoading } = useTeacher(teacherId);
  const canChangeTeacher = hasPermission("Can change teacher");
  
  const handleTeacherTitle = () => {
    if (teacher) return `Prof. ${teacher.user.full_name}`;
  };
  
  if (!hasPermission("Can view teacher")) return <AccessDenyPage />;
  if (isLoading) return <Spinner />;
  return (
    <>
      <Grid
        templateAreas={{
          base: `"teacherDetail teacherGroups"`,
        }}
        templateColumns={{
          base: `2fr 3fr`,
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
              <Heading size="md">{handleTeacherTitle()}</Heading>
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
        <GridItem area="teacherGroups">
          <UserGroupsPage userPk={teacherId} />
          <Box my={8} ml="20%" color="blue.500" fontSize="1.5rem">
            <Link to={`${AUTH_LAYOUT_ROUTE}/${TEACHERS_ROUTE}/${teacherId}/${SECTION_ASSIGNMENT_ROUTE}/`}>
              Assign Section
            </Link>
          </Box>
          {teacher?.mentees.length !== 0 ? (
            <>
              <Box ml="20%" fontWeight={500} my={4} fontSize={25} mt={20}>
                {`Prof. ${teacher?.user.last_name}'s Mentees`}
              </Box>
              <OverflowYContainer>
                <TeacherMenteesPage mentees={teacher?.mentees} />
              </OverflowYContainer>
            </>
          ) : (
            <></>
          )}

          <Heading size="md" my={4} ml="20%" mt={12}>
            {teacher?.user.full_name} Assigned Sections
          </Heading>
          <OverflowYContainer>
            <TeacherSectionListPage teacher_id={teacherId} />
          </OverflowYContainer>
        </GridItem>
      </Grid>
      {canChangeTeacher && <TeacherEditForm teacher={teacher} />}
    </>
  );
};

export default TeacherDetailPage;
