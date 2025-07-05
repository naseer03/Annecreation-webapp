'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/Store/authStore';
import SearchBar from './SearchBar';
import Logo from './Logo';

const navigationList = [
  { id: 1, name: 'Home', link: '/' },
  { id: 2, name: 'About Us', link: '/About' },
  { id: 3, name: 'Categories', link: '/Category' },
  { id: 4, name: 'Contact Us', link: '/Contactus' },
  { id: 5, name: 'Help', link: '/Help' },
];

const authMenuItems = [
  { label: 'My Profile', path: '/Profile?tab=profile' },
  { label: 'Order History', path: '/Profile?tab=orders' },
  { label: 'Downloads', path: '/Profile?tab=downloads' },
];

const guestMenuItems = [
  { label: 'Login', path: '/Auth/Login' },
  { label: 'Register', path: '/Auth/Register' },
];

const MobileDrawer = () => {
  const router = useRouter();

  const { user, accessToken, logout, setAccessToken } = useAuthStore();
  const isAuthenticated = Boolean(accessToken);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token && !accessToken) {
      setAccessToken(token);
    }
    setMounted(true);
  }, [accessToken, setAccessToken]);

  const handleNavigate = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Box
      sx={{
        p: 2,
        width: 250,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 2 }}>
        <Logo />
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Navigation */}
      <List sx={{ flexGrow: 1, p: 0 }}>
        {navigationList.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => handleNavigate(item.link)}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
        <SearchBar color="var(--secondary)" />
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Auth Section */}
      {mounted && isAuthenticated ? (
        <Box sx={{ px: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: 'var(--secondary)', fontWeight: 'bold', mb: 1 }}
          >
            {user?.name || 'User'}
          </Typography>

          {authMenuItems.map((item) => (
            <button
              key={item.label}
              href={item.path}
              className="text-sm font-semibold text-[var(--secondary)]"
              style={{ padding: '8px 0', display: 'block' }}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-red-600 cursor-pointer"
            style={{ padding: '8px 0', display: 'block' }}
          >
            Logout
          </button>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          gap={1.5}
          sx={{ px: 1 }}
        >
          {guestMenuItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="text-sm font-semibold text-[var(--secondary)]"
              style={{ padding: '8px 0', display: 'block' }}
            >
              {item.label}
            </a>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MobileDrawer;
