import {
  Grid,
  GridItem,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import OverflowYContainer from "../../GroupsAndPermissions/OverflowYContainer";
import { useCourses } from "../../hooks/useCourses";
import DepartmentFilter from "../departments/DepartmentFilter";

const CoursesList = () => {
  const { data: courses, isLoading } = useCourses();
  if (isLoading) return <Spinner />;

  return (
    <Grid
      templateAreas={{
        base: `"searchBar searchBar" "main filter"`,
        // sm: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: `"1fr" "8fr 2fr"`,
        // sm: `225px 1fr`,
      }}
    >
      <GridItem area="searchBar">Search Bar</GridItem>

      <GridItem area="main">
        <TableContainer>
          <OverflowYContainer maxH="90vh">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Code</Th>
                  <Th>Title</Th>
                  <Th>Level</Th>
                  <Th>Price per Credit </Th>
                  <Th>Credit</Th>
                </Tr>
              </Thead>
              <Tbody>
                {courses?.map((course) => (
                  <Tr key={course.id}>
                    <Td>{course.code}</Td>
                    <Td>{course.title}</Td>
                    <Td>{course.level}</Td>
                    <Td>$ {course.price_per_credit.toFixed(2)}</Td>
                    <Td>{course.credit}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </OverflowYContainer>
        </TableContainer>
      </GridItem>
      <GridItem area="filter">
        <DepartmentFilter />
      </GridItem>
    </Grid>
  );
};

export default CoursesList;
