'use client';

import React, { useState, useRef } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import BreadCrum from '@/components/BreadCrum/BreadCrum';
const OtpForm = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only keep last digit
    setOtp(newOtp);
    setError(false);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (otp.some((digit) => digit === '')) {
  //     setError(true);
  //     return;
  //   }
  //   setSubmitted(true);
  //   setError(false);
  // };

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
    '& .MuiInputLabel-root': {
      color: '#311807',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#311807',
    },
  };

  return (
    <>
    <BreadCrum
        crumbs={[
          { label: 'Forgot Password', href: '/Auth/forgotpassword' },
          { label: 'OTP', href: '/Auth/OTP' },
          
         ]}
      />
    <Container maxWidth="sm"  className='my-20'>
      <Card sx={{ boxShadow: '0px 0px 10px 0px #00000040', borderRadius: '12px' }}>
        <CardContent>
          <Typography
            variant="h1"
            align="center"
            fontSize='24px'
            sx={{ fontWeight: 'bold', mb: 4, fontFamily: 'Poppins' }}
          >
            Enter OTP Code
          </Typography>

          <form >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mb: 3,
              }}
            >
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (inputsRef.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: 'center',
                      fontSize: '24px',
                      width: '26px',
                      height: '26px',
                    },
                  }}
                  sx={commonStyles}
                  error={error && digit === ''}
                />
              ))}
            </Box>

            {error && (
              <Typography sx={{ color: 'error.main', fontSize: '13px', textAlign: 'center', mb: 1 }}>
                Please enter all 4 digits of the OTP
              </Typography>
            )}

            {submitted && (
              <Typography sx={{ color: 'green', fontSize: '14px', textAlign: 'center', mb: 1 }}>
                OTP Verified Successfully!
              </Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: 'var(--primary)',
                  borderRadius: '8px',
                  px: 6,
                  color: '#fff',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#e6a81f' },
                }}
              >
                Verify OTP
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
    </>
  );
};

export default OtpForm;
