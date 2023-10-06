import { HStack, List, ListItem } from "@chakra-ui/react";
import useSchoolYear from "../../hooks/useSchoolYears";

const SchoolYearList = () => {
  const { data } = useSchoolYear();

  return (
    <HStack>
      <List>
        {data?.map((data) => (
          <ListItem _hover={{cursor: 'pointer', borderBottom: '2px'}} fontSize={30} key={data.id}>{data.year}</ListItem>
        ))}
      </List>
    </HStack>
  );
};

export default SchoolYearList;
