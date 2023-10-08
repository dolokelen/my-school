import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SCH_YEAR_LIST_ROUTE } from "../data/constants";
import SchoolYearDashBoard from "../pages/schoolYears/SchoolYearDashBoard";

const DashBoard = () => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<FaChevronDown />}>
        Pages
      </MenuButton>
      <MenuList>
        <MenuItem>
          <SchoolYearDashBoard />
        </MenuItem>
        <MenuItem>
          <SchoolYearDashBoard />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DashBoard;
