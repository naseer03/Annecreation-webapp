'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Typography,
  Divider,
} from '@mui/material';
import { IoPersonOutline } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';

import { useAuthStore } from '@/Store/authStore';
import useCartStore from '@/Store/cartStore';
import useWishlistStore from '@/Store/wishlistStore';

const ProfileMenu = ({ anchorEl, handleClick, handleClose }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Zustand store access
  const { user, accessToken, logout, setAccessToken } = useAuthStore();
  const cartCount = useCartStore((state) => state.cart?.items_count || 0);
  const wishlistCount = useWishlistStore((state) => state.wishlist?.length || 0);

  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token && !accessToken) {
        setAccessToken(token);
      }
      setIsHydrated(true);
    }
  }, [accessToken, setAccessToken]);

  const handleLogout = () => {
    logout();
    handleClose();
    router.push('/');
  };

  const iconHoverStyle = {
    '&:hover svg': {
      color: 'var(--primary)',
    },
  };

  const badgeSx = {
    '& .MuiBadge-badge': {
      backgroundColor: 'var(--primary)',
      color: 'var(--secondary)',
    },
  };

const authMenuItems = [
  { label: 'My Profile', path: '/Profile?tab=profile' },
  { label: 'Downloads', path: '/Profile?tab=downloads' },
  { label: 'Order History', path: '/Profile?tab=orders' },
];

  const guestMenuItems = [
    { label: 'Login', path: '/Auth/Login' },
    { label: 'Register', path: '/Auth/Register' },
  ];

  const isAuthenticated = Boolean(accessToken);

  return (
    <>
      {/* Profile Icon */}
      <IconButton
        onClick={handleClick}
        sx={iconHoverStyle}
        aria-label="profile-menu-button"
      >
        <IoPersonOutline
          color={Boolean(anchorEl) ? 'var(--primary)' : 'var(--secondary)'}
          size={26}
        />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {isAuthenticated ? (
          <div>
            <MenuItem disabled>
              <Typography
                variant="body2"
                sx={{ color: 'var(--secondary)', fontWeight: 'bold' }}
              >
                {user?.name || 'Token expires'}
              </Typography>
            </MenuItem>
            <Divider />
            {authMenuItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => {
                  handleClose();
                  router.push(item.path);
                }}
              >
                {item.label}
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </div>
        ) : (
          guestMenuItems.map((item) => (
            <MenuItem
              key={item.label}
              onClick={() => {
                handleClose();
                router.push(item.path);
              }}
            >
              {item.label}
            </MenuItem>
          ))
        )}
      </Menu>

      {/* Wishlist Icon */}
      <IconButton
        onClick={() => router.push('/WishList')}
        sx={iconHoverStyle}
        aria-label="wishlist"
      >
        <Badge
          badgeContent={isAuthenticated && isHydrated ? wishlistCount : 0}
          color="primary"
          sx={badgeSx}
        >
          <FaRegHeart
            size={26}
            color={pathname === '/WishList' ? 'var(--primary)' : 'var(--secondary)'}
          />
        </Badge>
      </IconButton>

      <IconButton
        onClick={() => router.push('/Cart')}
        sx={iconHoverStyle}
        aria-label="cart"
      >
        <Badge
          badgeContent={isAuthenticated && isHydrated ? cartCount : 0}
          color="primary"
          sx={badgeSx}
        >
          <MdOutlineShoppingCart
            size={26}
            color={pathname === '/Cart' ? 'var(--primary)' : 'var(--secondary)'}
          />
        </Badge>
      </IconButton>
    </>
  );
};

export default ProfileMenu;
