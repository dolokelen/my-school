import { Avatar, Divider, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HOME_ROUTE, SCH_YEAR_LIST_ROUTE } from "../data/constants";

const SideBar = () => {
  return (
    <Flex
      bg="gray.200"
      pos="sticky"
      h="95vh"
      marginTop="-0.8vh"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex w="50%">Here is an other Flex Box</Flex>

      <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" mb={4}>
        <Divider />
        <Flex>
          {" "}
          <Avatar /> <Link to={SCH_YEAR_LIST_ROUTE}>Sch Yrd List</Link>
        </Flex>
        <Flex>
          <Link to={HOME_ROUTE}>Home</Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
