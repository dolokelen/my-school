import { Box, HStack, List, ListItem } from "@chakra-ui/react";
import { useSchoolYears } from "../../hooks/useSchoolYears";
import SchoolYearCreateForm from "./SchoolYearCreateForm";
import { Link } from "react-router-dom";

const SchoolYearList = () => {
  const { data } = useSchoolYears();

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
              <Link to={`/school-years/${data.id}`}>{data.year}</Link>
            </ListItem>
          ))}
        </List>
      </HStack>
    </>
  );
};

export default SchoolYearList;
