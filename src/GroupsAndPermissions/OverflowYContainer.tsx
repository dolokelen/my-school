import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  maxH?: string;
}

const OverflowYContainer = ({ children, maxH }: Props) => {
  return (
    <Box maxH={maxH ? maxH : "300px"} overflowY="auto">
      {children}
    </Box>
  );
};

export default OverflowYContainer;
