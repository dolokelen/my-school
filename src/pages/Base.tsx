import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Base = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main" "footer"`,
        sm: `"main" "footer"`,
      }}
      templateColumns={{
        base: `1fr`,
        sm: `1fr`,
      }}
    >
      <GridItem area="main" bg="tomato">
        <Outlet />
      </GridItem>
      <GridItem area="footer" bg="gray" py={10}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Base;
