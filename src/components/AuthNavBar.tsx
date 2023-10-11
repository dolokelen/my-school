import { HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../data/constants";
import authRouteToHomeRoute from "../data/getHomeRoute";
import logoutUser from "../data/logoutUser";

const AuthNavBar = () => {
  return (
    <>
      <HStack bg="gray.200" h={9} mb={1} justifyContent="space-evenly">
        <Link to={authRouteToHomeRoute()}>Home</Link>
        <Link to={LOGIN_ROUTE}>Login</Link>
        <Link to={authRouteToHomeRoute()} onClick={logoutUser}>
          Logout
        </Link>
        <Link to={REGISTER_ROUTE}>Register</Link>
      </HStack>
      <ToastContainer />
    </>
  );
};

export default AuthNavBar;
