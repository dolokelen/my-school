import { Box, HStack, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSchoolYears } from "../../hooks/useSchoolYears";
import SchoolYearCreateForm from "./SchoolYearCreateForm";
import { useEffect } from "react";

const SchoolYearList = () => {
  const [params, setParams] = useSearchParams();
  const { data, isLoading, error } = useSchoolYears();

  const removeUpdatedQueryParam = () => {
    const updatedParam = params.get('updated');
    if (updatedParam) {
      params.delete('updated');
      setParams(params);
    }
  };

  useEffect(() => {
    if (params.get('updated')) {
      toast.success("School year updated successfully!");
      removeUpdatedQueryParam();
    }
  }, [params]);
  
  if (isLoading) return <Spinner />
  if (error) return <Text color="red">{error.message}</Text>

  return (
    <>
    {/* {params.get('updated') && toast.success("School year updated successfully!")}
    {params.get('deleted') && toast.success("School year deleted successfully!")} */}
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
              <Link to={`/school-years/${data.id}`}>{data.year}</Link>
            </ListItem>
          ))}
        </List>
      </HStack>
    </>
  );
};

export default SchoolYearList;
