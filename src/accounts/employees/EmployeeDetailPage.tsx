import { Card, CardBody, Heading, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEmployee } from "../../hooks/useEmployees";
import UserGroupsPage from "../../pages/users/UserGroupsPage";

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const employeeId = parseInt(id!);
  const { data: employee, isLoading } = useEmployee(employeeId);
console.log(employeeId)
  if (isLoading) return <Spinner />;
  return (
    <>
    <Card maxW='sm'>
  <CardBody>
    <Image
    width="100%"
    height="auto"
    objectFit="cover"
      src={employee?.image}
      alt={employee?.user.first_name}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{employee?.user.full_name}</Heading>
      <Text>Username: {employee?.user.username}</Text>
      <Text>Email: {employee?.user.email}</Text>
      <Text>Gender: {employee?.gender}</Text>
      <Text>Birth Date: {employee?.birth_date}</Text>
      <Text>Marital Status: {employee?.marital_status}</Text>
      <Text>Religion: {employee?.religion}</Text>
      <Text>Employment Status: {employee?.employment_status}</Text>
      <Text>Employment Date: {employee?.joined_at}</Text>
      <Text>Employment Is Active? {employee?.user.is_active ? "Yes" : "No"}</Text>
      <Text>Salary: $ {employee?.salary.toFixed(2)}</Text>
      <Text>Office: {employee?.office.building.name}, office {employee?.office.id}</Text>
      <Text>Department Name: {employee?.department.name}</Text>
      <Text>Supervisor: {employee?.supervisor?.full_name ? employee.supervisor.full_name : "None"}</Text>
      <Text>Term of Reference: <a href={employee?.term_of_reference} download target="_blank">
        PDF
      </a> </Text>
    </Stack>
  </CardBody>
</Card>

      {/* <EmployeeEditForm /> */}
      <UserGroupsPage userPk={employeeId} />
    </>
  );
};

export default EmployeeDetailPage;
