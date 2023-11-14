import { useParams } from "react-router-dom";
import { useDeleteMajor, useMajor } from "../../hooks/useMajors";
import { Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { red } from "../../cacheKeysAndRoutes";
import { hasPermission } from "../../Utilities/hasPermissions";
import MajorEditForm from "./MajorEditForm";
import { toast } from "react-toastify";
import { deletionErrorMessage } from "../deletionErrorMessage";
import AccessDenyPage from "../AccessDenyPage";

const MajorDetailPage = () => {
  if (!hasPermission("Can view major")) return <AccessDenyPage />;

  const { id } = useParams();
  const majorId = parseInt(id!);
  const { data: major } = useMajor(majorId);
  const mutation = useDeleteMajor(() => "Major deleted successfully!");
  const canDeleteMajor = hasPermission("Can delete major");
  const canChangeMajor = hasPermission("Can change major");
  const fontSize = "1.3rem";

  const handleMutationError = () => {
    if (mutation.isError) toast.error(`Major ${deletionErrorMessage}`);
  };
  
  return (
    <>
      <Grid
        templateAreas={{
          base: `"majorDetail majorEditForm"`,
        }}
        templateColumns={{
          base: `1.2fr 1fr`,
        }}
        justifyContent="space-center"
      >
        <GridItem area="majorDetail">
          <Text fontSize="1.5rem">Major Name: {major?.name}</Text>
          <Text fontSize={fontSize}>
            Major Department: {major?.department.name}
          </Text>
          {canDeleteMajor && (
            <Button
              isActive
              colorScheme={red}
              type="submit"
              onClick={() => {
                mutation.mutate(majorId);
                handleMutationError();
              }}
            >
              Delete Major
            </Button>
          )}
        </GridItem>

        <GridItem area="majorEditForm">
          {canChangeMajor && <MajorEditForm major={major} />}
        </GridItem>
      </Grid>
    </>
  );
};

export default MajorDetailPage;
