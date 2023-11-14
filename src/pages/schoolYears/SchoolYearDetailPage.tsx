import { Heading, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useSchoolYear } from "../../hooks/useSchoolYears";
import SchoolYearEditForm from "./SchoolYearEditForm";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

const SchoolYearDetailPage = () => {
  if (!hasPermission("Can view school year")) return <AccessDenyPage />;

  const { id } = useParams();
  const schId = parseInt(id!);
  const { data, isLoading, error } = useSchoolYear(schId);
  const canChangeSchoolYear = hasPermission("Can change school year");

  if (error) throw error;
  if (isLoading) return <Spinner />;
  if (canChangeSchoolYear)
    return (
      <>
        <Heading marginY={4} as="h3">
          Edit Academic year: {data.year}
        </Heading>
        <SchoolYearEditForm />
      </>
    );
  return <AccessDenyPage />
};

export default SchoolYearDetailPage;
