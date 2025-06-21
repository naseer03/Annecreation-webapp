'use client';

import React from 'react';
import { TableCell, TableRow, Box } from '@mui/material';
import Image from 'next/image';
import useCartStore from '@/Store/cartStore';
import { API_URL } from '@/Store/authStore';

const CartItemRow = ({ item }) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);


  
  return (
    <TableRow>
      {/* Image Cell */}
      <TableCell>
        <Box display="flex" alignItems="center" gap={2}>
          {item?.image ? (
            <Image
              src={`${API_URL}/${item.image}`}
              alt={item?.model || 'Product image'}
              width={150}
              height={100}
            />
          ) : (
            <Box
              width={100}
              height={100}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="#f0f0f0"
            >
              <span>No image</span>
            </Box>
          )}
        </Box>
      </TableCell>

      {/* Product Info */}
      <TableCell>
        <p className="text-md text-[var(--secondary)] font-semibold">
          {item.name || item.code}
        </p>
   

        {/* Render Add-on Options */}
        {Array.isArray(item.options) && item.options.length > 0 && (
          <ul type="none" className="mt-2 text-sm text-gray-700 ">
            {item.options.map((opt) => (
              <li key={opt.option_value_id}>
                 {opt.option_value_name}
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => removeFromCart(item._id || item.id)}
          className="mt-3 md:w-2/3 rounded-md border-[var(--primary)] hover:bg-[var(--primary)] border-2 text-sm cursor-pointer text-[#311807] px-2 py-1"
        >
          Remove
        </button>
      </TableCell>

      {/* Price Details */}
      <TableCell>₹{(item.final_price || 0).toFixed(2)}</TableCell>
      <TableCell>₹{(item.discount || 0).toFixed(2)}</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>
        ₹{item.subtotal}
      </TableCell>
    </TableRow>
  );
};

export default CartItemRow;
