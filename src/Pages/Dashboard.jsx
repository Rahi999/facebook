import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import { Box, Center, Container, Toast, useToast } from '@chakra-ui/react'
import { getCookies } from '../utils/getData'
import { removeCookies } from '../utils/removeData'
import Loading from '../Components/Loading'
import FbTabs from '../Components/Tabs'

const Dashboard = () => {
  const navigate = useNavigate()
  const token = getCookies("fb_token")
  const toast = useToast()

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
    document.title = "Facebook | Dashboard"
  }, [])

  const logout = () => {
    removeCookies("fb_token")
    navigate("/login")
  }
  return (
    <Box bg={'white'} >
      <SideBar
        children={<FbTabs />}
      />
    </Box>
  )
}

export default Dashboard