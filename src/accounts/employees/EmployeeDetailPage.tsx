import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Image,
  Spinner,
  Text
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { hasPermission } from "../../Utilities/hasPermissions";
import { useEmployee } from "../../hooks/useEmployees";
import UserGroupsPage from "../../pages/users/UserGroupsPage";
import EmployeeEditForm from "./EmployeeEditForm";
import AccessDenyPage from "../../pages/AccessDenyPage";

const EmployeeDetailPage = () => {
  if (!hasPermission("Can view employee")) return <AccessDenyPage />;
  
  const { id } = useParams();
  const employeeId = parseInt(id!);
  const { data: employee, isLoading } = useEmployee(employeeId);
  const canChangeEmployee = hasPermission("Can change employee");

  const handleEmployeeTitle = () => {
    if (employee) {
      const female = "Female";
      const single = "Single";
      const married = "Married";

      if (employee.gender === female && employee.marital_status === married)
        return `Mrs. ${employee.user.full_name}`;
      if (employee.gender === female && employee.marital_status === single)
        return `Ms. ${employee.user.full_name}`;
      return `Mr. ${employee.user.full_name}`;
    }
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      <Grid
        templateAreas={{
          base: `"employeeDetail employeeGroups"`,
        }}
        templateColumns={{
          base: `1fr 1.8fr`,
        }}
      >
        <GridItem area="employeeDetail">
          <Card maxW="sm">
            <CardBody>
              <Image
                width="100%"
                height="auto"
                objectFit="cover"
                src={employee?.image}
                alt={employee?.user.first_name}
                borderRadius="lg"
              />
              <Heading size="md">{handleEmployeeTitle()}</Heading>
              <Text>Username: {employee?.user.username}</Text>
              <Text>Email: {employee?.user.email}</Text>
              <Text>Phone: {employee?.phone}</Text>
              <Text>Gender: {employee?.gender}</Text>
              <Text>Birth Date: {employee?.birth_date}</Text>
              <Text>Marital Status: {employee?.marital_status}</Text>
              <Text>Religion: {employee?.religion}</Text>
              <Text>Employment Status: {employee?.employment_status}</Text>
              <Text>Employment Date: {employee?.joined_at}</Text>
              <Text>
                Account Active? {employee?.user.is_active ? "Yes" : "No"}
              </Text>
              <Text>
                Highest Education Obtained: {employee?.level_of_education}
              </Text>
              <Text>Salary: $ {employee?.salary.toFixed(2)}</Text>
              <Text>
                Office: {employee?.office.building.name}, office{" "}
                {employee?.office.id}
              </Text>
              <Text>Department Name: {employee?.department.name}</Text>
              <Text>
                Supervisor:{" "}
                {employee?.supervisor?.full_name
                  ? employee.supervisor.full_name
                  : "None"}
              </Text>
              <Text>
                Term of Reference:{" "}
                <a href={employee?.term_of_reference} download target="_blank">
                  PDF
                </a>
              </Text>
              <Text>Country: {employee?.employeeaddress?.country}</Text>
              <Text>County: {employee?.employeeaddress?.county}</Text>
              <Text>City: {employee?.employeeaddress?.city}</Text>
              <Text>District: {employee?.employeeaddress?.district}</Text>
              <Text>Community: {employee?.employeeaddress?.community}</Text>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem area="employeeGroups">
          <UserGroupsPage userPk={employeeId} />
        </GridItem>
      </Grid>
      {canChangeEmployee && (
        <EmployeeEditForm employee={employee} />
      )}
    </>
  );
};

export default EmployeeDetailPage;
