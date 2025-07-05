'use client';

import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Alert, Typography } from '@mui/material';
import { useAuthStore } from '@/Store/authStore';

const MyProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    phone: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const { updateProfile, getProfile, isLoading } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getProfile();

        if (data) {
          setFormData({
            firstName: data.firstname || '',
            secondName: data.lastname || '',
            email: data.email || '',
            phone: data.telephone || '',
          });
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);

        setSnackbar({
          open: true,
          message:
            (err && err.response && err.response.data && err.response.data.message) ||
            err.message ||
            'Failed to load user data.',
          severity: 'error',
        });
      }
    };

    fetchUser();
  }, [getProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProfile({
        firstname: formData.firstName,
        lastname: formData.secondName,
        telephone: formData.phone,
      });

      setSnackbar({
        open: true,
        message: response?.message || 'Profile updated successfully!',
        severity: 'success',
      });

      setFormData((prev) => ({
        ...prev,
        firstName: response?.firstname || prev.firstName,
        secondName: response?.lastname || prev.secondName,
        phone: response?.telephone || prev.phone,
      }));
    } catch (err) {
      console.error('Error updating profile:', err);

      setSnackbar({
        open: true,
        message:
          (err && err.response && err.response.data && err.response.data.message) ||
          err.message ||
          'Failed to update profile.',
        severity: 'error',
      });
    }
  };

  const inputStyle = {
    mt: 1,
    mb: 1,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'var(--primary)',
        borderWidth: '2px',
        borderRadius: '8px',
      },
      '&:hover fieldset': {
        borderColor: 'var(--primary)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--primary)',
      },
    },
  };

  return (
    <Box className="rounded-xl ml-5 border-2 border-[var(--primary)]">
      <h6 className="border-b-2 border-[var(--primary)] text-2xl p-4">My Profile</h6>

      {snackbar.open && (
        <Box className="px-4 pt-4 flex justify-center">
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            variant="outlined"
            sx={{ width: '50%' }}
          >
            {snackbar.message}
          </Alert>
        </Box>
      )}

      <form className="w-[50%] mx-auto py-5" onSubmit={handleSubmit}>
        {/* First Name */}
        <Box>
          <label htmlFor="firstName" className="text-sm text-[var(--secondary)] font-medium">
            First Name <span className="text-red-500">*</span>
          </label>
          <TextField
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={inputStyle}
          />
        </Box>

        {/* Second Name */}
        <Box>
          <label htmlFor="secondName" className="text-sm text-[var(--secondary)] font-medium">
            Second Name <span className="text-red-500">*</span>
          </label>
          <TextField
            id="secondName"
            name="secondName"
            value={formData.secondName}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={inputStyle}
          />
        </Box>

        {/* Email (read-only) */}
        <Box>
          <label htmlFor="email" className="text-sm text-[var(--secondary)] font-medium">
            Email :
            {/* <span className="text-red-500">*</span> */}
          </label>
          {/* <TextField
            id="email"
            name="email"
            value={formData.email}
            fullWidth
            size="small"
            sx={inputStyle}
          /> */}
          <Typography variant="body1" component="span">
            {formData.email}
          </Typography>
        </Box>

        {/* Phone Number */}
        <Box>
          <label htmlFor="phone" className="text-sm text-[var(--secondary)] font-medium">
            Phone Number :
            {/* <span className="text-red-500">*</span> */}
          </label>
          {/* <TextField
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={inputStyle}
          /> */}
          <Typography variant="body1" component="span">
            {formData.phone}
          </Typography>
        </Box>

        {/* Submit Button */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              backgroundColor: 'var(--primary)',
              color: '#fff',
              borderRadius: '8px',
              px: 4,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '14px',
              '&:hover': {
                backgroundColor: '#fff',
                color: 'var(--secondary)',
                border: '1px solid var(--primary)',
              },
            }}
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default MyProfile;
