import {
    Button,
    Menu,
    MenuButton,
    MenuList
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa";
  
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
  