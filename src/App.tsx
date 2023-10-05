import { Grid, GridItem, Show } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        sm: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: `1fr`,
        sm: `200px 1fr`,
      }}
    >
      <GridItem area="nav" bg="coral">
        Nav
      </GridItem>
      <Show above="sm">
        <GridItem area="aside" bg="gold">
          Aside
        </GridItem>
      </Show>
      <GridItem area="main" bg="green">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
