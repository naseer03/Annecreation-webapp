'use client';

import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useAuthStore } from '@/Store/authStore';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const { changePassword, error, isLoading, changePasswordSuccess } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    changePassword({
      current_password: formData.currentPassword,
      new_password: formData.newPassword,
    });

  };
  
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        setSnackbar({
          open: true,
          message: error ||
            'Failed to update password.',
          severity: 'error',
        });
        if (changePasswordSuccess) {
          setSnackbar({
            open: true,
            message: 'Password updated successfully!',
            severity: 'success',
          });
        }
      }
    }
  }, [isLoading, error])

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
      <h6 className="border-b-2 border-[var(--primary)] text-2xl p-4">Change Password</h6>

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
        {/* Current Password */}
        <Box>
          <label htmlFor="currentPassword" className="text-sm text-[var(--secondary)] font-medium">
            Current Password <span className="text-red-500">*</span>
          </label>
          <TextField
            id="currentPassword"
            name="currentPassword"
            type="password"
            placeholder="Enter Current password"
            value={formData.currentPassword}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={inputStyle}
          />
        </Box>

        {/* New Password */}
        <Box>
          <label htmlFor="newPassword" className="text-sm text-[var(--secondary)] font-medium">
            New Password <span className="text-red-500">*</span>
          </label>
          <TextField
            id="newPassword"
            type="password"
            placeholder="Enter New password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            sx={inputStyle}
          />
        </Box>

        {/* Confirm Password */}
        <Box>
          <label htmlFor="confirmPassword" className="text-sm text-[var(--secondary)] font-medium">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Enter Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            sx={inputStyle}
          />
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
            {isLoading ? 'Updating...' : 'Update Password'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ChangePassword;
