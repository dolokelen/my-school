import { HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HOME_ROUTE, SCH_YEAR_LIST_ROUTE } from "../data/constants";

const NavBar = () => {
  return (
    <>
    <HStack bg='gray.200'>
      <Link to={HOME_ROUTE}>Home</Link>
      <Link to={`${SCH_YEAR_LIST_ROUTE}`}>School years</Link>
    </HStack>
    <ToastContainer />
    </>
  );
};

export default NavBar;
