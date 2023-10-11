import { Box, HStack, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSchoolYears } from "../../hooks/useSchoolYears";
import SchoolYearCreateForm from "./SchoolYearCreateForm";
import { useEffect } from "react";
import { AUTH_LAYOUT_ROUTE, SCH_YEAR_LIST_ROUTE } from "../../data/constants";

const SchoolYearList = () => {
  const [params, setParams] = useSearchParams();
  const { data, isLoading, error } = useSchoolYears();

  const removeUpdatedQueryParam = () => {
    const updatedParam = params.get("updated");
    if (updatedParam) {
      params.delete("updated");
      setParams(params);
    }
    const deletedParam = params.get("deleted");
    if (deletedParam) {
      params.delete("deleted");
      setParams(params);
    }
  };

  useEffect(() => {
    if (params.get("updated")) {
      toast.success("School year updated successfully!");
      removeUpdatedQueryParam();
    }
    if (params.get("deleted")) {
      toast.success("School year deleted successfully!");
      removeUpdatedQueryParam();
    }
  }, [params]);

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red">{error.message}</Text>;

  return (
    <>
      <Box marginY={6}>
        <SchoolYearCreateForm />
      </Box>
      <HStack>
        <List>
          {data?.map((data) => (
            <ListItem
              _hover={{ cursor: "pointer", borderBottom: "2px" }}
              fontSize={30}
              key={data.id}
            >
              <Link to={`${AUTH_LAYOUT_ROUTE}/${SCH_YEAR_LIST_ROUTE}/${data.id}`}>{data.year}</Link>
            </ListItem>
          ))}
        </List>
      </HStack>
    </>
  );
};

export default SchoolYearList;
