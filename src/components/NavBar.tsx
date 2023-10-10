import { Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { HOME_ROUTE, LOGIN_ROUTE } from '../data/constants'

const NavBar = () => {
  return (
    <Flex justifyContent="space-evenly">
      <Link to={HOME_ROUTE}>Home</Link>
      <Link to={LOGIN_ROUTE}>Login</Link>
    </Flex>
  )
}

export default NavBar