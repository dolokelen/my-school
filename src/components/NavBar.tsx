import { HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const NavBar = () => {
  return (
    <>
    <HStack bg='gray.200'>
      <Link to="/">Home</Link>
      <Link to="/school-years">School years</Link>
    </HStack>
    <ToastContainer />
    </>
  );
};

export default NavBar;
