import { Box } from '@chakra-ui/react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <Box margin={6}>
    <NavBar />
    <Outlet />
    </Box>
  )
}

export default Layout