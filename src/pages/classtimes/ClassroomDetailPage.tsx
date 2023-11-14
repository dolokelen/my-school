import { Box, Button, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { hasPermission } from "../../Utilities/hasPermissions";
import { red } from "../../cacheKeysAndRoutes";
import { useClasstime, useDeleteClasstime } from "../../hooks/useClasstimes";
import ClasstimeEditForm from "./ClasstimeEditForm";

const ClasstimeDetailPage = () => {
  const { id } = useParams();
  const classtimeId = parseInt(id!);
  const { data: classtime, isLoading } = useClasstime(classtimeId);

  const mutation = useDeleteClasstime(() =>
    toast.success("Deleted successfully!")
  );

  const canDeleteClasstime = hasPermission("Can delete class time");
  const canChangeClasstime = hasPermission("Can change class time");

  const fontSize = "1rem";
  const marginBottom = "1rem";
  const mutationErrorMsg = `Classtime cannot be deleted because it may have dependencies!`;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Grid
        templateAreas={{
          base: `"classtimeDetail classtimeEditForm"`,
        }}
        templateColumns={{
          base: `1fr 1.5fr`,
        }}
      >
        <GridItem area="classtimeDetail">
          <Box mb={marginBottom} fontSize="2rem">
            {classtime?.start_time} - {classtime?.end_time}{" "}
            {classtime?.week_days}
          </Box>
          <Text fontSize={fontSize}>Start Time: {classtime?.start_time}</Text>
          <Text fontSize={fontSize}>Dimension: {classtime?.end_time}</Text>
          <Text fontSize={fontSize}>Building: {classtime?.week_days}</Text>
        </GridItem>

        <GridItem area="classtimeEditForm">
          {canChangeClasstime && (
            <>
              <Box mb={marginBottom} fontSize="2rem">
                Update Form
              </Box>
              <ClasstimeEditForm classtime={classtime} />
            </>
          )}
        </GridItem>
      </Grid>
      {canDeleteClasstime && (
        <Button
          isActive
          mt="4rem"
          colorScheme={red}
          onClick={() => {
            mutation.mutate(classtimeId);
            mutation.isError && toast.error(mutationErrorMsg);
          }}
        >
          Delete Classtime
        </Button>
      )}
    </>
  );
};

export default ClasstimeDetailPage;
