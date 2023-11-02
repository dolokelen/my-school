import { MenuItem, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { hasPermission } from "../Utilities/hasPermissions";
import {
  BUILDINGS_CREATE_ROUTE,
  BUILDINGS_ROUTE,
  COURSES_CREATE_ROUTE,
  COURSES_LIST_ROUTE,
  DEPARTMENTS_ROUTE,
  DEPARTMENT_CREATE_ROUTE,
  GROUP_ROUTE,
  OFFICES_CREATE_ROUTE,
  OFFICES_ROUTE,
  REGISTER_ROUTE,
  SCH_YEAR_LIST_ROUTE,
  SEMESTERS_ROUTE,
  SEMESTER_CREATE_ROUTE,
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
        {hasPermission("Can view department") && (
          <MenuItem>
            {<Link to={DEPARTMENTS_ROUTE}>All Departments</Link>}
          </MenuItem>
        )}
        {hasPermission("Can add department") && (
          <MenuItem>
            {<Link to={DEPARTMENT_CREATE_ROUTE}>Department Create Form</Link>}
          </MenuItem>
        )}
        {hasPermission("Can view semester") && (
          <MenuItem>
            {<Link to={SEMESTERS_ROUTE}>All Semesters</Link>}
          </MenuItem>
        )}
        {hasPermission("Can add semester") && (
          <MenuItem>
            {<Link to={SEMESTER_CREATE_ROUTE}>Semester Create Form</Link>}
          </MenuItem>
        )}
        {hasPermission("Can view building") && (
          <MenuItem>
            {<Link to={BUILDINGS_ROUTE}>Buildings</Link>}
          </MenuItem>
        )}
        {hasPermission("Can add building") && (
          <MenuItem>
            {<Link to={BUILDINGS_CREATE_ROUTE}>Building Create Form</Link>}
          </MenuItem>
        )}
        {hasPermission("Can view office") && (
          <MenuItem>
            {<Link to={OFFICES_ROUTE}>Offices</Link>}
          </MenuItem>
        )}
        {hasPermission("Can add office") && (
          <MenuItem>
            {<Link to={OFFICES_CREATE_ROUTE}>Office Create Form</Link>}
          </MenuItem>
        )}
      </DashBoardMenu>
    </Stack>
  );
};

export default DashBoard;
