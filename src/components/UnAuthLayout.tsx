import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const UnAuthLayout = ({ children }: Props) => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main" "footer"`,
        sm: `"nav" "main" "footer"`,
      }}
      templateColumns={{
        base: `1fr`,
        sm: `1fr`,
      }}
    >
      <GridItem area="nav" bg="gray.500">
        <NavBar />
      </GridItem>

      <GridItem area="main" bg="tomato">
        {children ? children : <Outlet />}
      </GridItem>

      <GridItem area="footer" bg="gray" py={10}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default UnAuthLayout;
