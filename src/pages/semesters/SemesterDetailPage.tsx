import {
  Grid,
  GridItem,
  Button,
  Text,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";
import {
  AUTH_LAYOUT_ROUTE,
  COURSES_LIST_ROUTE,
  red,
} from "../../cacheKeysAndRoutes";
import { useDeleteSemester, useSemester } from "../../hooks/useSemesters";
import { Link, useParams } from "react-router-dom";
import OverflowYContainer from "../../GroupsAndPermissions/OverflowYContainer";
import SemesterEditForm from "./SemesterEditForm";
import { hasPermission } from "../../Utilities/hasPermissions";
import { toast } from "react-toastify";
import AddSemesterSpecificCourses from "./AddSemesterSpecificCourses";

const SemesterDetailPage = () => {
  const { id } = useParams();
  const semesterId = parseInt(id!);
  const { data: semester } = useSemester(semesterId);
  const mutation = useDeleteSemester(() =>
    toast.success("Semester deleted successfully!")
  );
  const canChangeSemester = hasPermission("Can change semester");
  const canDeleteSemester = hasPermission("Can delete semester");

  const fontSize = "1.1rem";
  const marginBottom = "1rem";

  return (
    <Grid
      templateAreas={{
        base: `"semesterDetail semesterEditForm" "semesSpecificCourse semesSpecificCourse"`,
      }}
      templateColumns={{
        base: `1.4fr 2fr`,
      }}
      justifyContent="space-center"
    >
      <GridItem area="semesterDetail">
        <Box mb={marginBottom} fontSize="2rem">
          Semester: {semester?.name}
        </Box>
        <Text fontSize="1.5rem">School Year: {semester?.school_year}</Text>
        <Text fontSize={fontSize}>
          Registration start date: {semester?.enrollment_end_date}
        </Text>
        <Text fontSize={fontSize}>
          Registration end date: {semester?.enrollment_end_date}
        </Text>
        <Text fontSize={fontSize}>Opening date: {semester?.start_date}</Text>
        <Text fontSize={fontSize}>Closing date: {semester?.end_date}</Text>
        <Text fontSize={fontSize}>
          Number of courses: {semester?.courses?.length}
        </Text>

        <Text fontSize={fontSize} fontWeight="bold">
          Semester {semester?.name} {semester?.school_year} Courses
        </Text>
        <OverflowYContainer maxH="30vh">
          {semester?.courses?.map((course) => (
            <List key={course.id}>
              <ListItem fontSize={fontSize}>
                <Link
                  to={`${AUTH_LAYOUT_ROUTE}/${COURSES_LIST_ROUTE}/${course.id}`}
                >
                  {course.code}
                </Link>
              </ListItem>
            </List>
          ))}
        </OverflowYContainer>

        {canDeleteSemester && (
          <Button
            isActive
            mt="1rem"
            colorScheme={red}
            onClick={() => mutation.mutate(semesterId)}
          >
            Delete Semester
          </Button>
        )}
      </GridItem>

      <GridItem area="semesterEditForm">
        {canChangeSemester && (
          <>
            <Box mb={marginBottom} fontSize="2rem">
              Update Form
            </Box>
            <SemesterEditForm />
          </>
        )}
      </GridItem>

      {canChangeSemester && (
        <GridItem area="semesSpecificCourse">
          <Box
            fontSize="1.6rem"
            mt="3.5rem"
            mb="1rem"
            fontWeight="bold"
            ml={20}
          >
            Add new courses to this semester exclusively if necessary
          </Box>
          <AddSemesterSpecificCourses
            semesterCourses={semester?.courses}
            isCurrentSemester={semester?.is_current}
          />
        </GridItem>
      )}
    </Grid>
  );
};

export default SemesterDetailPage;
