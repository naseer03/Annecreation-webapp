'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useAuthStore } from '@/Store/authStore';
import { useRouter } from 'next/navigation';

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

const renderLabel = (text, name) => (
  <Typography
    component="label"
    htmlFor={name}
    sx={{
      fontWeight: 600,
      fontSize: '14px',
      mb: 1,
      display: 'block',
      color: 'var(--secondary)',
    }}
  >
    {text} <span style={{ color: 'red' }}>*</span>
  </Typography>
);

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState('');
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {
      firstName: formData.firstName.trim() === '',
      lastName: formData.lastName.trim() === '',
     email: !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email),
      phone: !/^\d{10,15}$/.test(formData.phone),
      password: formData.password.length < 6,
      confirmPassword: formData.confirmPassword !== formData.password,
      termsAccepted: !formData.termsAccepted,
    };

    setErrors(newErrors);
    return Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) return;

    try {
      const response = await register(formData);
      setApiMessage(response?.message || 'Registration successful!');
      setErrors({});
      router.push('/Auth/Login');
    } catch (err) {
      const errorMsg = err?.response?.data?.message || 'Something went wrong';
      const apiErrors = {};

      if (errorMsg.toLowerCase().includes('email')) apiErrors.email = true;
      if (errorMsg.toLowerCase().includes('phone')) apiErrors.phone = true;
      if (errorMsg.toLowerCase().includes('password')) apiErrors.password = true;
      if (errorMsg.toLowerCase().includes('first')) apiErrors.firstName = true;
      if (errorMsg.toLowerCase().includes('last')) apiErrors.lastName = true;

      setErrors((prev) => ({ ...prev, ...apiErrors }));
      setApiMessage(errorMsg);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {apiMessage && (
        <Typography textAlign="center" color={apiMessage.includes('success') ? 'green' : 'error'} mb={2}>
          {apiMessage}
        </Typography>
      )}

      {/* Name Fields */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mb={2}>
        <Box width="100%">
          {renderLabel('First Name', 'firstName')}
          <TextField
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            error={errors.firstName}
            helperText={errors.firstName && 'First name is required'}
            sx={commonStyles}
          />
        </Box>
        <Box width="100%">
          {renderLabel('Last Name', 'lastName')}
          <TextField
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            error={errors.lastName}
            helperText={errors.lastName && 'Last name is required'}
            sx={commonStyles}
          />
        </Box>
      </Box>

      {/* Email & Phone */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mb={2}>
        <Box width="100%">
          {renderLabel('Email', 'email')}
          <TextField
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={errors.email}
            helperText={errors.email && 'Enter a valid email address'}
            sx={commonStyles}
          />
        </Box>
        <Box width="100%">
          {renderLabel('Phone Number', 'phone')}
          <TextField
            id="phone"
            name="phone"
            autoComplete="tel"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            error={errors.phone}
            helperText={errors.phone && 'Phone number must be 10–15 digits'}
            sx={commonStyles}
          />
        </Box>
      </Box>

      {/* Password Fields */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mb={2}>
        <Box width="100%">
          {renderLabel('Password', 'password')}
          <TextField
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            error={errors.password}
            helperText={errors.password && 'Password must be at least 6 characters'}
            sx={commonStyles}
          />
        </Box>
        <Box width="100%">
          {renderLabel('Confirm Password', 'confirmPassword')}
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            error={errors.confirmPassword}
            helperText={errors.confirmPassword && 'Passwords do not match'}
            sx={commonStyles}
          />
        </Box>
      </Box>

      {/* Terms */}
     <Box mt={2}>
  <FormControlLabel
    control={
      <Checkbox
        name="termsAccepted"
        checked={formData.termsAccepted}
        onChange={handleChange}
        sx={{
          color: 'var(--primary)',
          '&.Mui-checked': { color: 'var(--primary)' },
          
        }}
       
      />
    }
 
    label={
      <Typography
        fontSize="14px"
        color="var(--secondary)"
     
      >
        I agree to the 
        <Link
          href="/terms_conditions"
          className="text-transparent bg-clip-text bg-[linear-gradient(to_left,_#996E19_30%,_var(--primary))] underline"
        >
          Terms & Conditions
        </Link>
      </Typography>
    }
  />
  {errors.termsAccepted && (
    <Typography color="error" fontSize="13px" mt={0.5}>
      You must accept the terms and conditions
    </Typography>
  )}
</Box>




      {/* Submit */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{
            backgroundColor: 'var(--primary)',
            border: '2px solid var(--primary)',
            color: '#fff',
            px: { xs: 4, sm: 6 },
            width: { xs: '100%', sm: '30%' },
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: { xs: '14px', sm: '16px' },
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#fff',
              color: 'var(--secondary)',
            },
          }}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </Box>

      <Typography textAlign="center" mt={3} fontSize="14px">
        Already have an account?{' '}
        <Link href="/Auth/Login" className="underline">
          <span className="gradient-text">Login</span>
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
