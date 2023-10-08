import { Avatar, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../data/constants";
import DashBoard from "./DashBoard";

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
      <Flex mx={3}>
        <DashBoard />
      </Flex>

      <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" mb={4}>
        <Flex>
          <Avatar />
        </Flex>
        <Flex>
          <Link to={HOME_ROUTE}>Home</Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
