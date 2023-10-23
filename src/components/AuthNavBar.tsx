import { Avatar, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import authRouteToHomeRoute from "../Utilities/getHomeRoute";
import logoutUser from "../Utilities/logoutUser";
import { AUTH_LAYOUT_ROUTE, REGISTER_ROUTE } from "../cacheKeysAndRoutes";
import { useUserProfile } from "../hooks/useUsers";

const AuthNavBar = () => {
  const { data: userProfile } = useUserProfile();
  console.log("AuthNavBar: ", userProfile)
  return (
    <>
      <HStack bg="gray.200" h={9} mb={1} justifyContent="space-evenly">
        <Link to={authRouteToHomeRoute()}>Website</Link>
        <Link to={AUTH_LAYOUT_ROUTE}>Dashboard</Link>
        <Link to={authRouteToHomeRoute()} onClick={logoutUser}>
          Logout
        </Link>
        <Link to={REGISTER_ROUTE}>Register</Link>
        <Link to="#">Welcome {userProfile?.first_name}</Link>
      </HStack>
      <ToastContainer />
    </>
  );
};

export default AuthNavBar;
