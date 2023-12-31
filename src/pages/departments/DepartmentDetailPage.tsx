import {
  Box,
  Text,
  Grid,
  GridItem,
  Spinner,
  Button,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useDeleteDepartment, useDepartment } from "../../hooks/useDepartments";
import { useParams } from "react-router-dom";
import { red } from "../../cacheKeysAndRoutes";
import { hasPermission } from "../../Utilities/hasPermissions";
import DepartmentEditForm from "./DepartmentEditFrom";
import { toast } from "react-toastify";
import DepartmentAddressListPage from "./DepartmentAddressListPage";
import DepartmentContactListPage from "./DepartmentContactListPage";
import DepartmentContactEditForm from "./DepartmentContactEditForm";
import { useDepartmentContactStore } from "./departmentStore";
import AccessDenyPage from "../AccessDenyPage";
import { deletionErrorMessage } from "../../Utilities/httpErrorStatus";

const DepartmentDetailPage = () => {
  const { pk } = useParams();
  const departmentPk = parseInt(pk!);
  const { data: department, isLoading } = useDepartment(departmentPk);
  const mutation = useDeleteDepartment(() =>
    toast.success("Deleted successfully!")
  );

  const canDeleteDepartment = hasPermission("Can delete department");
  const canChangeDepartment = hasPermission("Can change department");

  const selectedDepartmentContactId = useDepartmentContactStore(
    (s) => s.departmentContactQuery.departmentContactId
  );
  const selectedDepartmentContact = department?.departmentcontact.find(
    (deptContact) => deptContact.id === selectedDepartmentContactId
  );

  if (!hasPermission("Can view department")) return <AccessDenyPage />;
  if (isLoading) return <Spinner />;

  const fontSize = "1rem";
  const marginBottom = "1rem";

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
          {department?.name} Department
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
          Number of Majors: {department?.majors.length}
        </Text>
        <Text fontSize={fontSize}>
          Created on: {department?.created_at.substring(0, 10)}
        </Text>
        <Box mt="1.3rem" fontSize="1.5rem" fontWeight={500}>
          {department?.name} Courses
        </Box>
        <List>
          {department?.courses.map((cos) => (
            <ListItem key={cos.id}>{cos.code}</ListItem>
          ))}
        </List>

        <Box mt="1.3rem" fontSize="1.5rem" fontWeight={500}>
          {department?.name} Department Address
        </Box>
        <DepartmentAddressListPage
          departmentaddress={department?.departmentaddress}
        />

        <Box mt="1.3rem" fontSize="1.5rem" fontWeight={500}>
          {department?.name} Department Contact(s)
        </Box>
        <DepartmentContactListPage
          departmentContacts={department?.departmentcontact}
        />
        <Box w={500}>
          <DepartmentContactEditForm
            selectedDepartmentContact={department?.departmentcontact[0]}
            departmentId={departmentPk}
          />
        </Box>

        {canDeleteDepartment && (
          <>
            <Button
              isActive
              mt="4rem"
              width="45%"
              colorScheme={red}
              onClick={() => {
                mutation.mutate(departmentPk);
                mutation.isError &&
                  toast.error(deletionErrorMessage(department?.name));
              }}
            >
              Delete Department
            </Button>
          </>
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
