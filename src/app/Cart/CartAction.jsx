'use client';
import React from 'react';
import { useCheckoutStore } from '@/Store/checkoutStore';
import { useSnackbar } from 'notistack';

const CartActions = ({ onContinue }) => {
  const { startCheckout, loading, error, response } = useCheckoutStore();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleCheckout = async () => {
    // const key = enqueueSnackbar('Starting checkout...', { variant: 'info', persist: true });

    // await startCheckout();

    // closeSnackbar(key); 

    if (response) {
      enqueueSnackbar('Checkout started successfully!', { variant: 'success' });
      console.log('Checkout started:', response);
    }
    
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="flex justify-between flex-wrap gap-4">
      <button
        onClick={onContinue}
        className="rounded-lg font-[700] text-md px-4 py-2 border-[var(--primary)] hover:bg-[var(--primary)] border-2 cursor-pointer text-[var(--secondary)]"
      >
        Continue Shopping
      </button>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        } bg-[var(--primary)] border-2 text-md hover:bg-white border-[var(--primary)] font-[700] rounded-lg px-8 py-2 cursor-pointer text-[var(--secondary)]`}
      >
        {loading ? 'Processing...' : 'Check out'}
      </button>
    </div>
  );
};

export default CartActions;
