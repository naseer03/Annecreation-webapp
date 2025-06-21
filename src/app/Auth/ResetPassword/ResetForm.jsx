'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const ResetPasswordForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      email: form.email.trim() === '',
      password: form.password.trim() === '',
      confirmPassword:
        form.confirmPassword.trim() === '' || form.password !== form.confirmPassword,
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
      setSuccess(true);
    }
  };

  const commonStyles = {
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
    '& .MuiInputBase-input': {
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  };

  return (
    <form onSubmit={handleSubmit} className="flex px-8 md:px-11 flex-col gap-4">
      <Box>
        <Typography
          component="label"
          htmlFor="email"
          sx={{ fontWeight: 600, fontSize: '14px', mb: 1, display: 'block' }}
        >
          Email <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          id="email"
          name="email"
          placeholder="Enter email"
          type="email"
          fullWidth
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email ? 'Email is required' : ''}
          sx={commonStyles}
          InputLabelProps={{ shrink: false }}
        />
      </Box>

      <Box>
        <Typography
          component="label"
          htmlFor="password"
          sx={{ fontWeight: 600, fontSize: '14px', mb: 1, display: 'block' }}
        >
          New Password <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          id="password"
          name="password"
          placeholder="Enter new password"
          type="password"
          fullWidth
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          helperText={errors.password ? 'Password is required' : ''}
          sx={commonStyles}
          InputLabelProps={{ shrink: false }}
        />
      </Box>

      <Box>
        <Typography
          component="label"
          htmlFor="confirmPassword"
          sx={{ fontWeight: 600, fontSize: '14px', mb: 1, display: 'block' }}
        >
          Confirm Password <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Re-enter new password"
          type="password"
          fullWidth
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          helperText={errors.confirmPassword ? 'Passwords must match' : ''}
          sx={commonStyles}
          InputLabelProps={{ shrink: false }}
        />
      </Box>

      {success && (
        <Typography sx={{ color: 'green', fontSize: '14px', textAlign: 'center' }}>
          Password reset successfully!
        </Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: 'var(--primary)',
            borderRadius: '8px',
            border: '2px solid var(--primary)',
            px: { xs: 4, sm: 6 },
            color: '#fff',
            fontWeight: 600,
            textTransform: 'none',
            fontSize: { xs: '14px', sm: '16px' },
            '&:hover': {
              backgroundColor: '#ffffff',
              color: 'var(--secondary)',
            },
          }}
        >
          Reset Password
        </Button>
      </Box>
    </form>
  );
};

export default ResetPasswordForm;
