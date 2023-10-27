import { Box, Text, Grid, GridItem, Spinner, Button } from "@chakra-ui/react";
import { useDeleteDepartment, useDepartment } from "../../hooks/useDepartments";
import { useParams } from "react-router-dom";
import { red } from "../../cacheKeysAndRoutes";
import { hasPermission } from "../../Utilities/hasPermissions";
import DepartmentEditForm from "./DepartmentEditFrom";
import { toast } from "react-toastify";

const DepartmentDetailPage = () => {
  const { pk } = useParams();
  const departmentPk = parseInt(pk!);
  const { data: department, isLoading } = useDepartment(departmentPk);
  const mutation = useDeleteDepartment(() =>
    toast.success("Deleted successfully!")
  );

  const canDeleteDepartment = hasPermission("Can delete department");
  const canChangeDepartment = hasPermission("Can change department");

  const fontSize = "1.3rem";
  const marginBottom = "1rem";
  if (isLoading) return <Spinner />;

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
          {department?.name}
        </Box>
        <Text fontSize={fontSize}>Name: {department?.name}</Text>
        <Text fontSize="1.5rem">Budget: $ {department?.budget.toFixed(2)}</Text>
        <Text w="50ch" fontSize={fontSize}>
          Duty: {department?.duty}
        </Text>
        <Text fontSize={fontSize}>
          Number of courses: {department?.number_of_courses}
        </Text>
        <Text fontSize={fontSize}>
          Created on: {department?.created_at.substring(0, 10)}
        </Text>
        {canDeleteDepartment && (
          <Button
            isActive
            mt="1rem"
            colorScheme={red}
            onClick={() => mutation.mutate(departmentPk)}
          >
            Delete Department
          </Button>
        )}
      </GridItem>

      <GridItem area="courseEditForm">
        {canChangeDepartment && (
          <>
            <Box mb={marginBottom} fontSize="2rem">
              Update Form
            </Box>
            <DepartmentEditForm />
          </>
        )}
      </GridItem>
    </Grid>
  );
};

export default DepartmentDetailPage;
