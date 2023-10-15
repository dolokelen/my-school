import { Heading, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useSchoolYear } from "../../hooks/useSchoolYears";
import SchoolYearEditForm from "./SchoolYearEditForm";

const SchoolYearDetailPage = () => {  
  const { id } = useParams();
  const schId = parseInt(id!);
  const { data, isLoading, error } = useSchoolYear(schId);

  if (error) throw error;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading marginY={4} as="h3">
        Edit Academic year: {data.year}
      </Heading>
      <SchoolYearEditForm />
    </>
  );
};

export default SchoolYearDetailPage;
