import { Box, Button, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { hasPermission } from "../../Utilities/hasPermissions";
import { ATTENDANCES_ROUTE, AUTH_LAYOUT_ROUTE, red } from "../../cacheKeysAndRoutes";
import { toast } from "react-toastify";
import AccessDenyPage from "../AccessDenyPage";
import { useDeleteSection, useSection } from "../../hooks/useSections";
import SectionEditForm from "./SectionEditForm";
import { deletionErrorMessage } from "../../Utilities/httpErrorStatus";
import AttendanceCreateForm from "../attendances/AttendanceCreateForm";

const SectionDetailPage = () => {
  const { id } = useParams();
  const sectionId = parseInt(id!);
  const { data: section, isLoading } = useSection(sectionId);

  const mutation = useDeleteSection(() =>
    toast.success("Deleted successfully!")
  );

  const canDeleteSection = hasPermission("Can delete section");
  const canChangeSection = hasPermission("Can change section");
  if (!hasPermission("Can view section")) return <AccessDenyPage />;

  const fontSize = "1rem";
  const marginBottom = "1rem";
  if (isLoading) return <Spinner />;

  return (
    <>
      <Grid
        templateAreas={{
          base: `"sectionDetail sectionEditForm"`,
        }}
        templateColumns={{
          base: `1.2fr 1fr`,
        }}
        // justifyContent="space-center"
      >
        <GridItem area="sectionDetail">
          <Box mb={marginBottom} fontSize="2rem" color="blue.500">
            <Link to={`${AUTH_LAYOUT_ROUTE}/${ATTENDANCES_ROUTE}/${sectionId}`}>
            {section?.course.code} Section {section?.name}</Link>
          </Box>
          <Text fontSize={fontSize}>Section Name: {section?.name}</Text>
          <Text fontSize={fontSize}>Course: {section?.course.code}</Text>
          <Text fontSize={fontSize}>
            Class Time: {section?.classtime.start_time} -{" "}
            {section?.classtime.end_time}, {section?.classtime.week_days}
          </Text>
          <Text fontSize={fontSize}>Class Room: {section?.classroom.name}</Text>
        </GridItem>

        <GridItem area="sectionEditForm">
          {canChangeSection && (
            <>
              <Box mb={marginBottom} fontSize="2rem">
                Update Form
              </Box>
              <SectionEditForm section={section} />
            </>
          )}
        </GridItem>
      </Grid>
      {canDeleteSection && (
        <Button
          isActive
          mt="4rem"
          colorScheme={red}
          onClick={() => {
            mutation.mutate(sectionId);
            mutation.isError && toast.error(deletionErrorMessage(section?.name));
          }}
        >
          Delete Section
        </Button>
      )}

      <AttendanceCreateForm sectionId={sectionId}/>
    </>
  );
};

export default SectionDetailPage;
