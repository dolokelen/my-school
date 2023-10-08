import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: "main",
        sm: `"aside main"`,
      }}
      templateColumns={{
        base: `1fr`,
        sm: `200px 1fr`,
      }}
    >
      <Show above="sm">
        <GridItem area="aside" bg="blue"><SideBar /></GridItem>
      </Show>
      <GridItem area="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
