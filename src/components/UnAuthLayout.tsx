import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import UnAuthFooter from "./UnAuthFooter";
import UnAuthNavBar from "./UnAuthNavBar";
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
        <UnAuthNavBar />
      </GridItem>

      <GridItem area="main" bg="tomato">
        {children ? children : <Outlet />}
      </GridItem>

      <GridItem area="footer" bg="gray" py={10}>
        <UnAuthFooter />
      </GridItem>
    </Grid>
  );
};

export default UnAuthLayout;
