import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  AUTH_LAYOUT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
} from "../cacheKeysAndRoutes";

const UnAuthNavBar = () => {
  return (
    <Flex justifyContent="space-evenly">
      <Link to={HOME_ROUTE}>Home</Link>
      <Link to={AUTH_LAYOUT_ROUTE}>Dashboard</Link>
      <Link to={LOGIN_ROUTE}>Login</Link>
    </Flex>
  );
};

export default UnAuthNavBar;
