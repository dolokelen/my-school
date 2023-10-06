import { Grid, GridItem, Show } from '@chakra-ui/react'

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
        <GridItem area="aside">
          Aside
        </GridItem>
      </Show>
      <GridItem area="main">
        Main
      </GridItem>
    </Grid>
  )
}

export default HomePage