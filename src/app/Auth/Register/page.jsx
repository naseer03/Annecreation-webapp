'use client';

import React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import BreadCrum from '@/components/BreadCrum/BreadCrum';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  return (
    <>
      <BreadCrum
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Register', href: '/Register' },
        ]}
      />
      <Container maxWidth="md" sx={{ my: 10 }}>
        <Card
          sx={{
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 4, sm: 5 },
            boxShadow: '0px 0px 10px 0px #00000020',
            borderRadius: '12px',
          }}
        >
          <CardContent>
            <Typography
              textAlign="center"
              fontWeight={700}
              fontSize={{ xs: '20px', md: '24px' }}
              mb={4}
              variant="h1"
              color="var(--secondary)"
            >
              Create a new account
            </Typography>
            <RegisterForm />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default RegisterPage;
