import {
  Button,
  Checkbox,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import OverflowYContainer from "../../GroupsAndPermissions/OverflowYContainer";
import {
  AUTH_LAYOUT_ROUTE,
  COURSES_LIST_ROUTE,
  blue,
} from "../../cacheKeysAndRoutes";
import { useCourses } from "../../hooks/useCourses";
import { useAddSemesterCourses } from "../../hooks/useSemesters";

interface Props {
  semesterCourses?: { id: number; code: string }[];
  isCurrentSemester?: boolean;
}

const AddSemesterSpecificCourses = ({
  semesterCourses,
  isCurrentSemester,
}: Props) => {
  const { data: courses, isLoading } = useCourses();
  const [selectedSemesterIds, setSelectedSemesterIds] = useState<number[]>([]);

  const { id } = useParams();
  const semesterId = parseInt(id!);

  const handleCoursesAddition = useAddSemesterCourses(
    { id: semesterId, courses_to_add_ids: selectedSemesterIds },
    () => {
      setSelectedSemesterIds([]);
      toast.success("All courses added successfully!");
    }
  );

  const newCourses = courses?.filter(
    (course) =>
      !semesterCourses?.some((semCourse) => semCourse.id === course.id)
  );

  const handleCheckboxChange = (semesterId: number) => {
    if (selectedSemesterIds.includes(semesterId)) {
      setSelectedSemesterIds(
        selectedSemesterIds.filter((id) => id !== semesterId)
      );
    } else {
      setSelectedSemesterIds([...selectedSemesterIds, semesterId]);
    }
  };

  const fontSize = "1.3rem";

  if (isLoading) return <Spinner />;

  return (
    <>
      <OverflowYContainer maxH="90vh">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize={fontSize}>Code</Th>
                <Th fontSize={fontSize}>Department</Th>
                <Th fontSize={fontSize}>Level</Th>
                <Th fontSize={fontSize}>Price per Credit </Th>
                <Th fontSize={fontSize}>Credit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isCurrentSemester &&
                newCourses?.map((course) => (
                  <Tr key={course.id}>
                    <Td>
                      <Checkbox
                        isChecked={selectedSemesterIds.includes(course.id)}
                        onChange={() => handleCheckboxChange(course.id)}
                      >
                        <Link
                          to={`${AUTH_LAYOUT_ROUTE}/${COURSES_LIST_ROUTE}/${course.id}`}
                        >
                          {course.code}
                        </Link>
                      </Checkbox>
                    </Td>
                    {/* <Td>
                      <Link
                        to={`${AUTH_LAYOUT_ROUTE}/${COURSES_LIST_ROUTE}/${course.id}`}
                      >

                        {course.departments.}
                      </Link>
                    </Td> */}
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
                        $ {course.price_per_credit.toFixed(2)}
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
            </Tbody>
          </Table>
        </TableContainer>
      </OverflowYContainer>
      {selectedSemesterIds.length === 0 ? (
        <Button isDisabled my={4} isActive colorScheme={blue}>
          Add Courses
        </Button>
      ) : (
        <Button
          onClick={handleCoursesAddition}
          type="submit"
          my={4}
          isActive
          colorScheme={blue}
        >
          Add Courses
        </Button>
      )}
    </>
  );
};

export default AddSemesterSpecificCourses;
