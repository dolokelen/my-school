import { Box, Button, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { hasPermission } from "../../Utilities/hasPermissions";
import { useBuilding, useDeleteBuilding } from "../../hooks/useBuildings";
import BuildingEditForm from "./BuildingEditForm";
import BuildingAddressPage from "./BuildingAddressPage";
import BuildingAddressEditForm from "./BuildingAddressEditForm";
import { red } from "../../cacheKeysAndRoutes";
import { toast } from "react-toastify";

const BuildingDetailPage = () => {
  const { id } = useParams();
  const buildingId = parseInt(id!);
  const { data: building, isLoading } = useBuilding(buildingId);

  const mutation = useDeleteBuilding(() =>
    toast.success("Deleted successfully!")
  );

  const canDeleteBuilding = hasPermission("Can delete building");
  const canChangeBuilding = hasPermission("Can change building");

  const fontSize = "1rem";
  const marginBottom = "1rem";
  const mutationErrorMsg = `${building?.name} cannot be deleted because it may have dependencies!`;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Grid
        templateAreas={{
          base: `"buildingDetail buildingEditForm"`,
        }}
        templateColumns={{
          base: `1.2fr 1fr`,
        }}
        justifyContent="space-center"
      >
        <GridItem area="buildingDetail">
          <Box mb={marginBottom} fontSize="2rem">
            {building?.name} Building
          </Box>
          <Text fontSize={fontSize}>Name: {building?.name}</Text>
          <Text fontSize={fontSize}>Dimension: {building?.dimension}</Text>
          <Text w="50ch" fontSize={fontSize}>
            Number of offices: {building?.office_counts}
          </Text>
          <Text fontSize={fontSize}>
            Number of classrooms: {building?.classroom_counts}
          </Text>
          <Text fontSize={fontSize}>
            Number of Toilet: {building?.toilet_counts}
          </Text>
          <Text fontSize={fontSize}>
            Date constructed: {building?.date_constructed}
          </Text>
          <Box mt="1.3rem" fontSize="1.5rem">
            {building?.name} Building Address
          </Box>
          <BuildingAddressPage buildingAddress={building?.buildingaddress} />
        </GridItem>

        <GridItem area="buildingEditForm">
          {canChangeBuilding && (
            <>
              <Box mb={marginBottom} fontSize="2rem">
                Update Form
              </Box>
              <BuildingEditForm building={building} />
            </>
          )}
        </GridItem>
      </Grid>
      {canChangeBuilding && (
        <BuildingAddressEditForm
          buildingAddress={building?.buildingaddress}
          buildingId={buildingId}
        />
      )}

      {canDeleteBuilding && (
        <Button
          isActive
          mt="4rem"
          width="60%"
          ml="9rem"
          colorScheme={red}
          onClick={() => {
            mutation.mutate(buildingId);
            mutation.isError && toast.error(mutationErrorMsg);
          }}
        >
          Delete Building Records
        </Button>
      )}
    </>
  );
};

export default BuildingDetailPage;
