import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar';

function Layout() {
    const [isSidebarOpen,setSidebarOpen]=useState(false);
  return (
   <Box display='block' width="100%" hright="100%">
    <Box>
        <Sidebar drawerWidth='250px' 
        isSidebarOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        />
        <Navbar
        isSidebarOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen}

        />
        <Outlet/>
    </Box>
   </Box>
  )
}

export default Layout
