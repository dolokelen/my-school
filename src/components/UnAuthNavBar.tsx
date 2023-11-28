import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  AUTH_LAYOUT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
} from "../cacheKeysAndRoutes";
import getUserId from "../Utilities/getUserId";
import logoutUser from "../Utilities/logoutUser";
import { useEffect, useState } from "react";
import ColorModeSwitch from "./ColorModeSwitch";

const UnAuthNavBar = () => {
  const [userId, setUserId] = useState<number | undefined>();
  const authUserId = getUserId();

  useEffect(() => {
    if (authUserId) {
      setUserId(authUserId);
    }
  }, [authUserId]);

  return (
    <Flex justifyContent="space-evenly">
      <Link to={HOME_ROUTE}>Home</Link>
      <Link to={AUTH_LAYOUT_ROUTE}>Dashboard</Link>
      {/* The last "Login" route is used for the Dashboard "Logout" route.
      This dynamic btn label is for users who might use the "Website" logout btn.*/}
      {authUserId ? (
        <Link
          to={LOGIN_ROUTE}
          onClick={() => {
            logoutUser();
            setUserId(undefined);
          }}
        >
          {userId ? "Logout" : "Login"}
        </Link>
      ) : (
        <Link to={LOGIN_ROUTE}>Login</Link>
      )}
      <ColorModeSwitch />
    </Flex>
  );
};

export default UnAuthNavBar;
