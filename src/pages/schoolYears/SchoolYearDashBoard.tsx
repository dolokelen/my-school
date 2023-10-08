import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SCH_YEAR_LIST_ROUTE } from "../../data/constants";

const SchoolYearDashBoard = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FaChevronDown />}>
        School Years
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Link to={SCH_YEAR_LIST_ROUTE}>School Year List</Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SchoolYearDashBoard;
