import {
  Box,
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
import PrerequisiteFilter from "./PrerequisiteFilter";
import { Link } from "react-router-dom";
import {
  AUTH_LAYOUT_ROUTE,
  COURSES_LIST_ROUTE,
} from "../../cacheKeysAndRoutes";
import SearchBar from "../searchBar";
import { useCourseStore } from "./courseStore";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

const CourseListPage = () => {
  
  const setSearchText = useCourseStore((s) => s.setSearchText);
  const { data: courses, isLoading } = useCourses();
  if (!hasPermission("Can view course")) return <AccessDenyPage />;
  if (isLoading) return <Spinner />;
  
  return (
    <Grid
    templateAreas={{
      base: `"searchBar searchBar" "main filter"`,
        // sm: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        // base: `"1fr" "8fr 2fr"`,
        base: `"1fr" 4fr 1fr`,
        // sm: `225px 1fr`,
      }}
    >
      <GridItem area="searchBar">
        <SearchBar setSearchText={setSearchText} />
      </GridItem>

      <GridItem area="main">
        <TableContainer>
          <OverflowYContainer maxH="90vh">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Code</Th>
                  <Th>Title</Th>
                  <Th>Level</Th>
                  <Th>Credit</Th>
                </Tr>
              </Thead>
              <Tbody>
                {courses?.map((course) => (
                  <Tr key={course.id}>
                    <Td>
                      <Link
                        to={`${AUTH_LAYOUT_ROUTE}/${COURSES_LIST_ROUTE}/${course.id}`}
                      >
                        {course.code}
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        to={`${AUTH_LAYOUT_ROUTE}/${COURSES_LIST_ROUTE}/${course.id}`}
                      >
                        {course.title}
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        to={`${AUTH_LAYOUT_ROUTE}/${COURSES_LIST_ROUTE}/${course.id}`}
                      >
                        {course.level}
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        to={`${AUTH_LAYOUT_ROUTE}/${COURSES_LIST_ROUTE}/${course.id}`}
                      >
                        {course.credit}
                      </Link>
                    </Td>
                  </Tr>
                ))}
                <Tr>
                  <Td>Total: {courses?.length}</Td>
                </Tr>
              </Tbody>
            </Table>
          </OverflowYContainer>
        </TableContainer>
      </GridItem>
      <GridItem area="filter">
        <Box fontWeight="bold">Filter by Departments</Box>
        <OverflowYContainer>
          <DepartmentFilter />
        </OverflowYContainer>
        <Box fontWeight="bold">Filter by Prerequisite Courses</Box>
        <OverflowYContainer>
          <PrerequisiteFilter />
        </OverflowYContainer>
      </GridItem>
    </Grid>
  );
};

export default CourseListPage;
