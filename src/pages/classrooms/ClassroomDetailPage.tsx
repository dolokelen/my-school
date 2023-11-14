import { Box, Button, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { hasPermission } from "../../Utilities/hasPermissions";
import { red } from "../../cacheKeysAndRoutes";
import { toast } from "react-toastify";
import { useClassroom, useDeleteClassroom } from "../../hooks/useClassrooms";
import ClassroomEditForm from "./ClassroomEditForm";

const ClassroomDetailPage = () => {
  const { id } = useParams();
  const classroomId = parseInt(id!);
  const { data: classroom, isLoading } = useClassroom(classroomId);

  const mutation = useDeleteClassroom(() =>
    toast.success("Deleted successfully!")
  );

  const canDeleteClassroom = hasPermission("Can delete class room");
  const canChangeClassroom = hasPermission("Can change class room");

  const fontSize = "1rem";
  const marginBottom = "1rem";
  const mutationErrorMsg = `${classroom?.name} cannot be deleted because it may have dependencies!`;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Grid
        templateAreas={{
          base: `"classroomDetail classroomEditForm"`,
        }}
        templateColumns={{
          base: `1.2fr 1fr`,
        }}
        // justifyContent="space-center"
      >
        <GridItem area="classroomDetail">
          <Box mb={marginBottom} fontSize="2rem">
            {classroom?.name}
          </Box>
          <Text fontSize={fontSize}>Name: {classroom?.name}</Text>
          <Text fontSize={fontSize}>Dimension: {classroom?.dimension}</Text>
          <Text fontSize={fontSize}>Building: {classroom?.building.name}</Text>
          <Text fontSize={fontSize}>
            Assigned Date: {classroom?.created_at}
          </Text>
        </GridItem>

        <GridItem area="classroomEditForm">
          {canChangeClassroom && (
            <>
              <Box mb={marginBottom} fontSize="2rem">
                Update Form
              </Box>
              <ClassroomEditForm classroom={classroom} />
            </>
          )}
        </GridItem>
      </Grid>
      {canDeleteClassroom && (
        <Button
          isActive
          mt="4rem"
          colorScheme={red}
          onClick={() => {
            mutation.mutate(classroomId);
            mutation.isError && toast.error(mutationErrorMsg);
          }}
        >
          Delete Classroom
        </Button>
      )}
    </>
  );
};

export default ClassroomDetailPage;
