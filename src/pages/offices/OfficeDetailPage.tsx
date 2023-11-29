import { Box, Button, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { hasPermission } from "../../Utilities/hasPermissions";
import { useDeleteOffice, useOffice } from "../../hooks/useOffices";
import OfficeEditForm from "./OfficeEditForm";
import { red } from "../../cacheKeysAndRoutes";
import { toast } from "react-toastify";
import AccessDenyPage from "../AccessDenyPage";
import { deletionErrorMessage } from "../../Utilities/httpErrorStatus";

const OfficeDetailPage = () => {
  const { id } = useParams();
  const officeId = parseInt(id!);
  const { data: office, isLoading } = useOffice(officeId);

  const mutation = useDeleteOffice(() =>
    toast.success("Office deleted successfully!")
  );

  const canDeleteOffice = hasPermission("Can delete office");
  const canChangeOffice = hasPermission("Can change office");
  if (!hasPermission("Can view office")) return <AccessDenyPage />;

  const fontSize = "1rem";
  const marginBottom = "1rem";
  if (isLoading) return <Spinner />;

  return (
    <>
      <Grid
        templateAreas={{
          base: `"officeDetail officeEditForm"`,
        }}
        templateColumns={{
          base: `1.2fr 1fr`,
        }}
        justifyContent="space-center"
      >
        <GridItem area="officeDetail">
          <Box mb={marginBottom} fontSize="2rem">
            {office?.building.name} Office {office?.id}
          </Box>
          <Text fontSize={fontSize}>Dimension: {office?.dimension}</Text>
          <Text fontSize={fontSize}>Builing: {office?.building.name}</Text>

          {canDeleteOffice && (
            <Button
              isActive
              mt="8rem"
              ml="9rem"
              colorScheme={red}
              onClick={() => {
                mutation.mutate(officeId);
                mutation.isError &&
                  toast.error(deletionErrorMessage("Office"));
              }}
            >
              Delete Office
            </Button>
          )}
        </GridItem>

        <GridItem area="officeEditForm">
          {canChangeOffice && (
            <>
              <Box mb={marginBottom} fontSize="2rem">
                Update Form
              </Box>
              <OfficeEditForm office={office} />
            </>
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default OfficeDetailPage;
