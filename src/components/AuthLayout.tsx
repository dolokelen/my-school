import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import AuthNavBar from "./AuthNavBar";
import SideBar from "./SideBar";
import LoginPage from "../accounts/LoginPage";

const AuthLayout = () => {
  // const [params, setParams] = useSearchParams();
  // const userId = params.get("userId");

  // const removeUserIdQueryParam = () => {
  //   if (userId) {
  //     params.delete(userId);
  //     setParams(params);
  //   }
  // };

  // useEffect(() => {
  //   if (userId) {
  //     console.log("HomePage", userId);
  //     removeUserIdQueryParam();
  //   }
  // }, [params]);
  if (0) 
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
          <SideBar />
        </GridItem>
      </Show>
      <GridItem mx={10} area="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
  return <LoginPage />
};

export default AuthLayout;
