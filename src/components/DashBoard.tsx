import { MenuItem, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { hasPermission } from "../Utilities/hasPermissions";
import {
  COURSES_CREATE_ROUTE,
  COURSES_LIST_ROUTE,
  GROUP_ROUTE,
  REGISTER_ROUTE,
  SCH_YEAR_LIST_ROUTE,
  USER_ROUTE,
} from "../cacheKeysAndRoutes";
import DashBoardMenu from "./DashBoardMenu";

const DashBoard = () => {
  return (
    <Stack w="auto">
      <DashBoardMenu label="Dashboards">
        {hasPermission("Can view user") && (
          <MenuItem>{<Link to={USER_ROUTE}>Users</Link>}</MenuItem>
          )}
          {hasPermission("Can view group") && (
            <MenuItem>{<Link to={GROUP_ROUTE}>Group</Link>}</MenuItem>
          )}
      </DashBoardMenu>

      <DashBoardMenu label="All Pages">
        {hasPermission("Can view school year") && (
          <MenuItem>
            {<Link to={SCH_YEAR_LIST_ROUTE}>School years</Link>}
          </MenuItem>
        )}
        {hasPermission("Can add user") && (
          <MenuItem>
            {<Link to={REGISTER_ROUTE}>Registration Form</Link>}
          </MenuItem>
        )}
        {hasPermission("Can view course") && (
          <MenuItem>
            {<Link to={COURSES_LIST_ROUTE}>All courses</Link>}
          </MenuItem>
        )}
        {hasPermission("Can add course") && (
          <MenuItem>
            {<Link to={COURSES_CREATE_ROUTE}>Course Create From</Link>}
          </MenuItem>
        )}
        
      </DashBoardMenu>
    </Stack>
  );
};

export default DashBoard;
