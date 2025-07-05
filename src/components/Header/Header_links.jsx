'use client'
import React, { useState } from 'react'
import { AppBar, Toolbar, Box, IconButton, Drawer } from '@mui/material'
import { FaBars } from 'react-icons/fa'
import DesktopNav from './DesktopNav'

import MobileDrawer from './MobileDrawer'
import SearchBar from './SearchBar'
import ProfileMenu from './ProfileMenu'
import Logo from './Logo'
import Link from 'next/link'

const Header_links = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open)
  }

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleProfileClose = () => {
    setProfileAnchorEl(null)
  }

  return (
    
    <AppBar position="static" sx={{ bgcolor: '#fff', color: '#333', boxShadow: 'none'}}>
      <Toolbar sx={{ justifyContent: 'space-between', px: '0 !important' }}>
        <Box display="flex" alignItems="center" gap={3}>
          <Link href="/"><Logo /></Link>
          <Box display={{ xs: 'none', lg: 'flex' }} gap={3}>
            <DesktopNav />
          </Box>
        </Box>

        <Box display={{ xs: 'none', lg: 'flex' }} alignItems="center" gap={2}>
          <SearchBar />
          <ProfileMenu
            anchorEl={profileAnchorEl}
            handleClick={handleProfileClick}
            handleClose={handleProfileClose}
          />
        </Box>

        <IconButton
          edge="end"
          color="var(--secondary)"
          sx={{ display: { lg: 'none' } }}
          onClick={toggleDrawer(true)}
        >
          <FaBars  color='var(--secondary)'/>
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <MobileDrawer />
      </Drawer>
    </AppBar>
  )
}

export default Header_links
