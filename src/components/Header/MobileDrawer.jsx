import React from 'react'
import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import SearchBar from './SearchBar'
import Logo from './Logo'

const navigationlist = [
  { id: 1, name: 'Home', link: '/' },
  { id: 2, name: 'About Us', link: '/About' },
  { id: 3, name: 'Categories', link: '/Category' },
  { id: 4, name: 'Contact Us', link: '/Contactus' },
  { id: 5, name: 'Help', link: '/Help' },
]

const MobileDrawer = () => (
  <Box
    sx={{
      p: 2, // padding around all content
      width: 250, // drawer width, adjust as needed
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box',
    }}
  >
    {/* Logo with bottom margin */}
    <Box sx={{ mb: 2 }}>
      <Logo />
    </Box>

    <Divider sx={{ mb: 2 }} />

    {/* Navigation list */}
    <List sx={{ flexGrow: 1, p: 0 }}>
      {navigationlist.map((item) => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton component="a" href={item.link}>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>

    <Divider sx={{ my: 2 }} />

    {/* Search bar with bottom margin */}
    <Box sx={{ mb: 2 }}>
      <SearchBar color="var(--secondary)" />
    </Box>

    {/* Bottom links stacked with gap */}
    <Box
      mt="auto"
      display="flex"
      flexDirection="column"
      gap={1.5}
      sx={{ px: 1 }}
    >
      <a
        href="/Auth/Login"
        className="text-sm font-semibold text-[var(--secondary)]"
        style={{ padding: '8px 0', display: 'block' }} // increase tap area
      >
        Login
      </a>
      <a
        href="/Auth/Register"
        className="text-sm font-semibold text-[var(--secondary)]"
        style={{ padding: '8px 0', display: 'block' }}
      >
        Register
      </a>
    </Box>
  </Box>
)

export default MobileDrawer
