import { Box, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import { hasPermission } from "../../Utilities/hasPermissions";
import { useEnrollment } from "../../hooks/useEnrollments";
import AccessDenyPage from "../AccessDenyPage";
import EnrollmentEditForm from "./EnrollmentEditForm";
import getPersonIdFromURL from "../../Utilities/getPersonIdFromURL";

const EnrollmentDetailPage = () => {
  const location = useLocation();
  const studentId = getPersonIdFromURL(location.pathname);

  const { enrollmentId } = useParams();
  const enrollId = parseInt(enrollmentId!);

  const { data: enrollment, isLoading } = useEnrollment(studentId, enrollId);

  const canChangeCourse = hasPermission("Can change enrollment");
  //   const canDeleteEnrollment = hasPermission("Can delete enrollment");
  if (!hasPermission("Can view enrollment")) return <AccessDenyPage />;

  if (isLoading) return <Spinner />;

  const fontSize = "1rem";
  const marginBottom = "1rem";

  return (
    <Grid
      templateAreas={{
        base: `"enrollDetail enrollEditForm"`,
      }}
      templateColumns={{
        base: `1.2fr 1fr`,
      }}
      justifyContent="space-center"
    >
      <GridItem area="enrollDetail">
        <Box mb={marginBottom} fontSize="1.5rem">
          {enrollment?.student.user.first_name}{" "}
          {enrollment?.student.user.last_name} Enrollment
        </Box>
        <Text>Course Code: {enrollment?.course.code}</Text>
        <Text fontSize={fontSize}>Section: {enrollment?.section.name}</Text>
        <Text fontSize={fontSize}>Semester: {enrollment?.semester.name}</Text>
        <Text fontSize={fontSize}>
          School Year: {enrollment?.school_year.year}
        </Text>
        <Text fontSize={fontSize}>Status: {enrollment?.status}</Text>
        <Text fontSize={fontSize}>
          Date: {enrollment?.date.substring(0, 10)}
        </Text>

        {/* {canDeleteEnrollment && (
            <Button
              isActive
              mt="1rem"
              colorScheme={red}
              onClick={() => {
                mutation.mutate(enrollmentId);
                mutation.isError &&
                  toast.error(deletionErrorMessage(enrollment?.code));
              }}
            >
              Delete Course
            </Button>
          )}*/}
      </GridItem>

      <GridItem area="enrollEditForm">
        {canChangeCourse && (
          <>
            <Box mb={marginBottom} fontSize="1.5rem">
              Update Form
            </Box>
            <EnrollmentEditForm enrollmentId={enrollId} />
          </>
        )}
      </GridItem>
    </Grid>
  );
};

export default EnrollmentDetailPage;
