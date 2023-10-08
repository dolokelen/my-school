import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav nav" "main"`,
        sm: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: `1fr`,
        sm: `200px 1fr`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <Show above="sm">
        <GridItem area="aside"><SideBar /></GridItem>
      </Show>
      <GridItem area="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
