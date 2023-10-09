import { HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HOME_ROUTE, REGISTER_ROUTE, SCH_YEAR_LIST_ROUTE } from "../data/constants";

const NavBar = () => {
  return (
    <>
    <HStack bg='gray.200' h={9} mb={1} justifyContent="center">
      <Link to={HOME_ROUTE}>Home</Link>
      <Link to={`${REGISTER_ROUTE}`}>Register</Link>
    </HStack>
    <ToastContainer />
    </>
  );
};

export default NavBar;
