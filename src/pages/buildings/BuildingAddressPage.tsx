import { Box, Text } from "@chakra-ui/react";
import { Address } from "../../hooks/useAddress"

interface Props {
    buildingAddress?: Address;
}
const BuildingAddressPage = ({ buildingAddress }: Props) => {
    const fontSize = "1rem";
  return (
    <Box>
        <Text fontSize={fontSize}>Country: {buildingAddress?.country}</Text>
        <Text fontSize={fontSize}>County: {buildingAddress?.county}</Text>
        <Text fontSize={fontSize}>City: {buildingAddress?.city}</Text>
        <Text fontSize={fontSize}>District: {buildingAddress?.district}</Text>
        <Text fontSize={fontSize}>Community: {buildingAddress?.community}</Text>
    </Box>
  )
}

export default BuildingAddressPage