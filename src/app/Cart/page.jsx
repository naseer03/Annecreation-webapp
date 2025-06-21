'use client';
import React, { useEffect } from 'react';
import { Container, Typography, Card, Box } from '@mui/material';
import BreadCrum from '@/components/BreadCrum/BreadCrum';
import useCartStore from '@/Store/cartStore';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/Store/authStore';
import CartTable from './CartTable';
import PriceDetails from './Pricedetails';
import CartActions from './CartAction';

const CartPage = () => {
  const { cart, getCartItem } = useCartStore();
  const { accessToken } = useAuthStore();
  const router = useRouter();

  const cartItems = cart?.cart?.items || [];
  const totals = cart?.totals || {};

  useEffect(() => {
    if (accessToken) {
      getCartItem();
    }
  }, [accessToken, getCartItem]);

  return (
    <>
      <BreadCrum
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Shopping Cart', href: '/Cart' },
        ]}
      />

      <Container sx={{ py: 10 }}>
        <Typography
          variant="h1"
          fontSize="32px"
          sx={{
            mb: 6,
            fontWeight: 'bold',
            fontFamily: 'Poppins',
            color: '#311807',
            textAlign: 'center',
          }}
        >
          Shopping Cart
        </Typography>

        {!accessToken ? (
          <Box className="text-center text-lg text-gray-600 py-10">
            Please login to view your cart.
          </Box>
        ) : (
          <>
            <div className="flex flex-wrap justify-between gap-4">
              <CartTable items={cartItems} />
              <PriceDetails
                subtotal={totals.subtotal ?? 0}
                 itemsCount={cart.items_count}
              />
            </div>

            <Card
              sx={{
                p: 2,
                boxShadow: 3,
                width: { xs: '100%', md: '70%' },
                mt: 4,
              }}
            >
              <CartActions onContinue={() => router.push('/')} />
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default CartPage;
