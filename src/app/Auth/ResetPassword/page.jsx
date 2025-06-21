'use client';

import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import BreadCrum from '@/components/BreadCrum/BreadCrum';
import ResetPasswordForm from './ResetForm';

import {useAuthStore} from '../../../Store/authStore' 

const ResetPasswordPage = () => {
  return (
    <>
      <BreadCrum
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Reset Password', href: '/ResetPassword' },
        ]}
      />
      <Container maxWidth="sm" className="py-20">
        <Card
          sx={{
            boxShadow: '0px 0px 10px 0px #00000040',
            borderRadius: '12px',
            py: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              color="var(--secondary)"
              sx={{
                fontWeight: 'bold',
                mb: 4,
                fontFamily: 'Poppins',
                color: 'var(--secondary)',
              }}
            >
              Reset Your Password
            </Typography>
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default ResetPasswordPage;
