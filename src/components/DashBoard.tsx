import { MenuItem, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  GROUP_ROUTE,
  SCH_YEAR_LIST_ROUTE,
  USER_ROUTE,
} from "../cacheKeysAndRoutes";
import DashBoardMenu from "./DashBoardMenu";
import { useUserGroupsPermissions } from "../hooks/useUsers";
import getUserId from "../Utilities/getUserId";

const DashBoard = () => {
  const { data: groups } = useUserGroupsPermissions(getUserId()!);

  let canViewUser;
  canViewUser = groups?.find((g) =>
    g.permissions?.some((p) => p.name === "Can view user")
  );

  return (
    <Stack w="auto">
      <DashBoardMenu label="Dashboards">
        {canViewUser && (
          <MenuItem>{<Link to={USER_ROUTE}>Users</Link>}</MenuItem>
        )}

        <MenuItem>{<Link to={GROUP_ROUTE}>Group</Link>}</MenuItem>
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
