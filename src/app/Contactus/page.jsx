'use client';

import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Container,
  useMediaQuery,
  useTheme,
  Card,
  Box,
} from '@mui/material';
import BreadCrum from '@/components/BreadCrum/BreadCrum';

const ContactUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    mobile: false,
    message: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      firstName: formData.firstName.trim() === '',
      lastName: formData.lastName.trim() === '',
      email: formData.email.trim() === '',
      mobile: formData.mobile.trim() === '',
      message: formData.message.trim() === '',
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      console.log('Form Submitted:', formData);
    }
  };

  const inputStyle = {
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
    paddingTop: 1,
    paddingBottom: 1,
  },
};


  return (
    <>
      <BreadCrum
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us', href: '/contact' },
        ]}
      />

      <Container maxWidth="md" className="my-20 ">
        <Card
          sx={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          paddingTop:0,
            padding:5,
            paddingBottom:8,
            borderRadius: '16px',
            my: 10,
          }}
        >
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <h1   className="text-center text-3xl  pb-7 font-semibold">
              Leave your message
            </h1>

            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4`}>
              <Box width="100%">
                <Typography fontWeight={600} fontSize={14} mb={0.5}>
                  First Name <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  name="firstName"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  helperText={errors.firstName ? 'First name is required' : ''}
                
                  InputLabelProps={{ shrink: true }}
                  sx={inputStyle}
                />
              </Box>

              <Box width="100%">
                <Typography fontWeight={600} fontSize={14} mb={0.5}>
                  Last Name <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  name="lastName"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  helperText={errors.lastName ? 'Last name is required' : ''}
                
                  InputLabelProps={{ shrink: true }}
                  sx={inputStyle}
                />
              </Box>
            </div>

            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4`}>
              <Box width="100%">
                <Typography fontWeight={600} fontSize={14} mb={0.5}>
                  Email <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  name="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  helperText={errors.email ? 'Email is required' : ''}
                
                  InputLabelProps={{ shrink: true }}
                  sx={inputStyle}
                />
              </Box>

              <Box width="100%">
                <Typography fontWeight={600} fontSize={14} mb={0.5}>
                  Mobile Number <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  name="mobile"
                  fullWidth
                  value={formData.mobile}
                  onChange={handleChange}
                  error={errors.mobile}
                  helperText={errors.mobile ? 'Mobile number is required' : ''}
              
                  InputLabelProps={{ shrink: true }}
                  sx={inputStyle}
                />
              </Box>
            </div>

            <Box>
              <Typography fontWeight={600} fontSize={14} mb={0.5}>
                Message <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                name="message"
                fullWidth
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                helperText={errors.message ? 'Message is required' : ''}
                InputLabelProps={{ shrink: true }}
                sx={inputStyle}
              />
            </Box>

            <div className="flex justify-center mt-8">
              <Button
                type="submit"
                sx={{
                  borderColor: 'var(--primary)',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--secondary) !important',
                  border:'2px solid var(--primary)',
                  fontWeight: 600,
                  px: { xs: 4, sm: 6 },
                  borderRadius: '8px',
                  textTransform:'none',
                  width: '30%',
                  fontSize: { xs: '14px', sm: '16px' },
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'var(--secondary)',
                   
                  },
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default ContactUsPage;
