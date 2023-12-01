import { Box, Button, Select, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AUTH_LAYOUT_ROUTE,
    PROFILE_ROUTE,
    SEMESTER_GRADE_ROUTE,
    blue,
} from "../../cacheKeysAndRoutes";
import { useStudentSchoolYears } from "../../hooks/useStudents";

interface Props {
  studentId: number;
}
const SchYearAndSemesterSelectionForm = ({ studentId }: Props) => {
  const [selectedSchYrdId, setSchYrdId] = useState<number>();
  const [selectedSemesterId, setSemester] = useState<number>();
  const navigate = useNavigate();

  const { data: schYearsSemesters, isLoading } =
    useStudentSchoolYears(studentId);

  if (isLoading) return <Spinner />;

  return (
    <form>
      <Box mb={12}>
        <Text>Select the school year </Text>
        <Select onChange={(e) => setSchYrdId(parseInt(e.target.value))}>
          <option value={0}>Select</option>
          {schYearsSemesters?.map((year) => (
            <option key={year.id} value={year.id}>
              {year.year}
            </option>
          ))}
        </Select>
      </Box>

      <Box mb={12}>
        <Text>Select the semester </Text>
        <Select onChange={(e) => setSemester(parseInt(e.target.value))}>
          <option value={0}>Select</option>
          {schYearsSemesters?.map((year) =>
            year.semesters.map((sem) => (
              <option key={sem.id} value={sem.id}>
                {sem.name}
              </option>
            ))
          )}
        </Select>
      </Box>
      {selectedSchYrdId && selectedSemesterId ? (
        <Button
          onClick={() =>
            navigate(
              `${AUTH_LAYOUT_ROUTE}/${PROFILE_ROUTE}/${SEMESTER_GRADE_ROUTE}/?${selectedSchYrdId}/${selectedSemesterId}`
            )
          }
          colorScheme={blue}
        >
          View Grade
        </Button>
      ): <></>}
    </form>
  );
};

export default SchYearAndSemesterSelectionForm;
