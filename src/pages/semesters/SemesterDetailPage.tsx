import {
  Grid,
  GridItem,
  Button,
  Text,
  Box,
  List,
  ListItem,
  Checkbox,
} from "@chakra-ui/react";
import {
  AUTH_LAYOUT_ROUTE,
  COURSES_LIST_ROUTE,
  red,
  teal,
} from "../../cacheKeysAndRoutes";
import {
  useDeleteSemester,
  useRemoveSemesterCourses,
  useSemester,
} from "../../hooks/useSemesters";
import { Link, useParams } from "react-router-dom";
import OverflowYContainer from "../../GroupsAndPermissions/OverflowYContainer";
import SemesterEditForm from "./SemesterEditForm";
import { hasPermission } from "../../Utilities/hasPermissions";
import { toast } from "react-toastify";
import AddSemesterSpecificCourses from "./AddSemesterSpecificCourses";
import { deletionErrorMessage } from "../deletionErrorMessage";
import AccessDenyPage from "../AccessDenyPage";
import { useEffect, useState } from "react";

const SemesterDetailPage = () => {
  const [selectedCourses, setSelectedCoursesId] = useState<number[]>([]);
  const { id } = useParams();
  const semesterId = parseInt(id!);
  const { data: semester } = useSemester(semesterId);
  const mutation = useDeleteSemester(() =>
    toast.success("Semester deleted successfully!")
  );
  const canChangeSemester = hasPermission("Can change semester");
  const canDeleteSemester = hasPermission("Can delete semester");

  const handleCourseRemoval = useRemoveSemesterCourses(
    { id: semesterId, courses_to_remove_ids: selectedCourses },
    () => {
      setSelectedCoursesId([]);
      toast.success("Courses removed successfully!");
    }
  );

  const handleMutationError = () => {
    if (mutation.isError) toast.error(`Semester ${deletionErrorMessage}`);
  };

  if (!hasPermission("Can view semester")) return <AccessDenyPage />;

  const handleCheckboxChange = (courseId: number) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCoursesId(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCoursesId([...selectedCourses, courseId]);
    }
  };

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
        <Text fontSize="1.5rem">School Year: {semester?.school_year.year}</Text>
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
          Semester {semester?.name} {semester?.school_year.year} Courses
        </Text>
        <OverflowYContainer maxH="30vh">
          {semester?.courses?.map((course) => (
            <List key={course.id}>
              <ListItem fontSize={fontSize}>
                <Checkbox
                  isChecked={selectedCourses.includes(course.id)}
                  onChange={() => handleCheckboxChange(course.id)}
                >
                  <Link
                    to={`${AUTH_LAYOUT_ROUTE}/${COURSES_LIST_ROUTE}/${course.id}`}
                  >
                    {course.code}
                  </Link>
                </Checkbox>
              </ListItem>
            </List>
          ))}
        </OverflowYContainer>

        {canDeleteSemester && (
          <Button
            isActive
            mt="1rem"
            colorScheme={red}
            onClick={() => {
              mutation.mutate(semesterId);
              handleMutationError();
            }}
          >
            Delete Semester
          </Button>
        )}

        <Button
          ml="1rem"
          mt="1rem"
          isActive
          type="submit"
          colorScheme={teal}
          onClick={handleCourseRemoval}
        >
          Remove Courses
        </Button>
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
          {semester?.is_current && (
            <>
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
            </>
          )}
        </GridItem>
      )}
    </Grid>
  );
};

export default SemesterDetailPage;
