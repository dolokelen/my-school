import { Text } from "@chakra-ui/react";
import { DepartmentAddress } from "../../hooks/useDepartments";

interface Props {
  departmentaddress?: DepartmentAddress;
}
const DepartmentAddressListPage = ({ departmentaddress }: Props) => {
  const fontSize = "1rem";

  return (
    <>
      <Text fontSize={fontSize}>Country: {departmentaddress?.country}</Text>
      <Text fontSize={fontSize}>County: {departmentaddress?.county}</Text>
      <Text fontSize={fontSize}>City: {departmentaddress?.city}</Text>
      <Text fontSize={fontSize}> District: {departmentaddress?.district}</Text>
      <Text fontSize={fontSize}>Community: {departmentaddress?.community}</Text>
    </>
  );
};

export default DepartmentAddressListPage;
