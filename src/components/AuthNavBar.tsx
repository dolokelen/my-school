import { HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import authRouteToHomeRoute from "../Utilities/getHomeRoute";
import logoutUser from "../Utilities/logoutUser";
import { AUTH_LAYOUT_ROUTE } from "../cacheKeysAndRoutes";
import { useUserProfile } from "../hooks/useUsers";
import ColorModeSwitch from "./ColorModeSwitch";

const AuthNavBar = () => {
  const { data: userProfile } = useUserProfile();
  
  return (
    <>
      <HStack bg="gray.200" h={9} mb={1} justifyContent="space-evenly">
        <Link to={authRouteToHomeRoute()}>Website</Link>
        <Link to={AUTH_LAYOUT_ROUTE}>Dashboard</Link>
        <Link to={authRouteToHomeRoute()} onClick={logoutUser}>
          Logout
        </Link>
        <Link to="#">Welcome {userProfile?.last_name}</Link>
        <ColorModeSwitch />
      </HStack>
      <ToastContainer />
    </>
  );
};

export default AuthNavBar;
