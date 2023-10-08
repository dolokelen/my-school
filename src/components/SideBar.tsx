import { Avatar, Divider, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { HOME_ROUTE, SCH_YEAR_LIST_ROUTE } from "../data/constants";

const SideBar = () => {
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex></Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems="flex-start"
        mb={4}
      >
        <Divider />
        <Flex> <Avatar /> <Link to={SCH_YEAR_LIST_ROUTE}>Sch Yrd List</Link></Flex>
        <Flex><Link to={HOME_ROUTE}>Home</Link></Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
