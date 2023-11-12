import { Box, Button, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { hasPermission } from "../../Utilities/hasPermissions";
import { useCourse, useDeleteCourse } from "../../hooks/useCourses";
import CourseEditForm from "./CourseEditForm";
import { red } from "../../cacheKeysAndRoutes";
import { toast } from "react-toastify";
import { deletionErrorMessage } from "../deletionErrorMessage";

const CourseDetailPage = () => {
  const { pk } = useParams();
  const courseId = parseInt(pk!);

  const { data: course, isLoading } = useCourse(courseId);
  const mutation = useDeleteCourse(() =>
    toast.success("Deleted successfully!")
  );
  const canChangeCourse = hasPermission("Can change course");
  const canDeleteCourse = hasPermission("Can delete course");

  if (isLoading) return <Spinner />;

  const fontSize = "1.3rem";
  const marginBottom = "1rem";

  const handleMutationError = () => {
    if (mutation.isError) toast.error(`Course ${deletionErrorMessage}`);
  };

  return (
    <Grid
      templateAreas={{
        base: `"courseDetail courseEditForm"`,
      }}
      templateColumns={{
        base: `1.2fr 1fr`,
      }}
      justifyContent="space-center"
    >
      <GridItem area="courseDetail">
        <Box mb={marginBottom} fontSize="2rem">
          {course?.title}
        </Box>
        <Text fontSize="1.5rem">Code: {course?.code}</Text>
        <Text fontSize={fontSize}>Title: {course?.title}</Text>
        <Text fontSize={fontSize}>Level: {course?.level}</Text>
        <Text fontSize={fontSize}>Department: {course?.department.name}</Text>
        <Text fontSize={fontSize}>
          Prerequisite:{" "}
          {course?.prerequisite?.code ? course?.prerequisite?.code : "None"}
        </Text>
        <Text fontSize={fontSize}>Credit hours: {course?.credit}</Text>
        <Text fontSize={fontSize}>
          Price per Credit hour: $ {course?.price_per_credit.toFixed(2)}
        </Text>
        <Text fontSize={fontSize}>
          Additional fee: $ {course?.additional_fee.toFixed(2)}
        </Text>
        <Text fontSize={fontSize}>
          Totial price: $ {course?.total_price.toFixed(2)}
        </Text>
        {canDeleteCourse && (
          <Button
            isActive
            mt="1rem"
            colorScheme={red}
            onClick={() => {
              mutation.mutate(courseId);
              handleMutationError();
            }}
          >
            Delete Course
          </Button>
        )}
      </GridItem>

      <GridItem area="courseEditForm">
        {canChangeCourse && (
          <>
            <Box mb={marginBottom} fontSize="2rem">
              Update Form
            </Box>
            <CourseEditForm />
          </>
        )}
      </GridItem>
    </Grid>
  );
};

export default CourseDetailPage;
