import { Box, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { hasPermission } from "../../Utilities/hasPermissions";
import { useBuilding } from "../../hooks/useBuildings";

const BuildingDetailPage = () => {
  const { id } = useParams();
  const buildingId = parseInt(id!);
  const { data: building, isLoading } = useBuilding(buildingId);
  //   const mutation = useDeleteBuilding(() =>
  //     toast.success("Deleted successfully!")
  //   );

  const canDeleteDepartment = hasPermission("Can delete building");
  const canChangeDepartment = hasPermission("Can change building");

//   const selectedDepartmentContactId = useDepartmentContactStore(
//     (s) => s.departmentContactQuery.departmentContactId
//   );
//   const selectedDepartmentContact = building?.departmentcontact.find(
//     (deptContact) => deptContact.id === selectedDepartmentContactId
//   );

  const fontSize = "1rem";
  const marginBottom = "1rem";
  if (isLoading) return <Spinner />;

  return (
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
        {/* <Box mt="1.3rem" fontSize="1.5rem" fontWeight={500}>
          {building?.name} Department Address
        </Box>
        <DepartmentAddressListPage
          departmentaddress={building?.departmentaddress}
        /> */}

        {/* <Box mt="1.3rem" fontSize="1.5rem" fontWeight={500}>
          {building?.name} Department Contact(s)
        </Box>
        <DepartmentContactListPage
          departmentContacts={building?.departmentcontact}
        />
        <DepartmentContactEditForm
          selectedDepartmentContact={selectedDepartmentContact}
          departmentId={buildingId}
        /> */}

        {/* {canDeleteDepartment && (
          <Button
            isActive
            mt="6rem"
            width="45%"
            colorScheme={red}
            onClick={() => mutation.mutate(buildingId)}
          >
            Delete Department
          </Button>
        )} */}
      </GridItem>

      <GridItem area="courseEditForm">
        {canChangeDepartment && (
          <>
            <Box mb={marginBottom} fontSize="2rem">
              Update Form
            </Box>
            {/* <DepartmentEditForm /> */}
          </>
        )}
      </GridItem>
    </Grid>
  );
};

export default BuildingDetailPage;
