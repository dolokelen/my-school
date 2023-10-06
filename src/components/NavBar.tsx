import { HStack } from '@chakra-ui/react'
import SchoolYearList from '../pages/schoolYears/SchoolYearList'

const NavBar = () => {
  return (
    <HStack>
        <SchoolYearList />
    </HStack>
  )
}

export default NavBar