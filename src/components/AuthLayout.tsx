import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import getUserId from "../Utilities/getUserId";
import LoginPage from "../accounts/LoginPage";
import { AUTH_LAYOUT_ROUTE } from "../cacheKeysAndRoutes";
import AuthHomePage from "./AuthHomePage";
import AuthNavBar from "./AuthNavBar";
import AuthSideBar from "./AuthSideBar";
import UnAuthLayout from "./UnAuthLayout";

const AuthLayout = () => {
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const userId = params.get("userId");

  const removeUserIdQueryParam = () => {
    if (userId) {
      params.delete("userId");
      setParams(params);
    }
  };

  useEffect(() => {
    if (userId) {
      removeUserIdQueryParam();
    }
  }, [userId]);

  if (getUserId())
    return (
      <Grid
        templateAreas={{
          base: `"nav nav" "main"`,
          sm: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: `1fr`,
          sm: `225px 1fr`,
        }}
      >
        <GridItem area="nav">
          <AuthNavBar />
        </GridItem>

        <Show above="sm">
          <GridItem area="aside">
            <AuthSideBar />
          </GridItem>
        </Show>
        <GridItem mx={3} area="main">
          {location.pathname === AUTH_LAYOUT_ROUTE ||
          location.pathname === `${AUTH_LAYOUT_ROUTE}/` ? (
            <AuthHomePage />
          ) : (
            <Outlet />
          )}
        </GridItem>
      </Grid>
    );
  return <UnAuthLayout children={<LoginPage />} />;
};

export default AuthLayout;
