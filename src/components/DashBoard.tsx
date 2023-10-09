import { MenuItem, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SCH_YEAR_LIST_ROUTE } from "../data/constants";
import DashBoardMenu from "./DashBoardMenu";

const DashBoard = () => {
  return (
    <Stack w="auto">
      <DashBoardMenu label="Dashboards">
        <MenuItem>
          {<Link to={SCH_YEAR_LIST_ROUTE}>School years</Link>}
        </MenuItem>
      </DashBoardMenu>

      <DashBoardMenu label="All Pages">
        <MenuItem>{<Link to={SCH_YEAR_LIST_ROUTE}>School</Link>}</MenuItem>

        <MenuItem>
          {<Link to={SCH_YEAR_LIST_ROUTE}>School years</Link>}
        </MenuItem>
      </DashBoardMenu>
    </Stack>
  );
};

export default DashBoard;
