import { MenuItem, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GROUP_ROUTE, SCH_YEAR_LIST_ROUTE } from "../data/constants";
import DashBoardMenu from "./DashBoardMenu";

const DashBoard = () => {
  const link = () => <Link to={GROUP_ROUTE}></Link> 
  return (
    <Stack w="auto">
      <DashBoardMenu label="Dashboards">
        <MenuItem>
          {<Link to={GROUP_ROUTE}>Group</Link>}
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
