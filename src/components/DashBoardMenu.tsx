import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
  } from "@chakra-ui/react";
  import { FaChevronDown } from "react-icons/fa";
  import { Link } from "react-router-dom";
  import { SCH_YEAR_LIST_ROUTE } from "../data/constants";
import { ReactNode } from "react";
  
  interface Props {
    label: string;
    children: ReactNode;
  }

  const DashBoardMenu = ({label, children}: Props) => {
    return (
        <Menu>
          <MenuButton as={Button} rightIcon={<FaChevronDown />}>
            {label}
          </MenuButton>
          <MenuList>
              {children}
          </MenuList>
        </Menu>
    );
  };
  
  export default DashBoardMenu;
  