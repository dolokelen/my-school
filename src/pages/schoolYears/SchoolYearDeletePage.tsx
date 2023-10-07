import { Box, Button } from "@chakra-ui/react";
import { useDeleteSchoolYear } from "../../hooks/useSchoolYears";

interface Props {
  schoolYearId: number;
}

const SchoolYearDeletePage = ({ schoolYearId }: Props) => {
  const deleteSchoolYear = useDeleteSchoolYear();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteSchoolYear.mutate(schoolYearId)
        }}
      >
        <Box marginTop={12}>
          <Button type="submit" colorScheme="red">
            Delete School Year
          </Button>
        </Box>
      </form>
    </>
  );
};

export default SchoolYearDeletePage;
