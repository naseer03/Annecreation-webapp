'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@mui/material';
import useWishlistStore from '@/Store/wishlistStore';
import { API_URL } from '@/Store/authStore';
import { useproductStore } from '@/Store/productStore';

const WishListCard = ({ item }) => {
  const router = useRouter();
  const { removeFromWishlist } = useWishlistStore();
  const { removeProductWithPriceById } = useproductStore();

  const handleViewDetails = () => {
    router.push(`/product/${item.product_id}`);
  };

  const handleRemove = async () => {
    await removeFromWishlist(item.product_id || item.id); // ✅ remove from wishlist state + API
    removeProductWithPriceById(item.product_id || item.id); // ✅ remove from UI list
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        p: 2,
        mb: 4,
        alignItems: { xs: 'flex-start', sm: 'center' },
        borderRadius: 2,
        backgroundColor: '#fff',
        width: '100%',
      }}
    >
      {/* Product Image */}
      <div className="relative w-full sm:w-[150px] h-[200px] sm:h-[150px]">
        <Image
          src={`${API_URL}/${item.image}`}
          alt={item.design || 'Image not found'}
          fill
          sizes="(max-width: 640px) 100vw, 150px"
          style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
        />
      </div>

      {/* Product Details */}
      <CardContent sx={{ p: '0 !important', flex: 1, width: '100%' }}>
        <ul className="flex flex-col gap-y-3 w-full">
          <li className="text-md font-semibold text-[var(--secondary)]">
            {item.model || 'Unknown Model'}
          </li>
          <li className="text-md text-[color:var(--secondary)B2]">
            {item.model || 'No Name'}
          </li>
          <li className="text-md">
            Price:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#996E19] via-[var(--primary)] to-[#996E19] font-bold">
              ₹{item.price?.toFixed(2) || '0.00'}
            </span>
          </li>
          <li className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={handleViewDetails}
              className="rounded-lg px-5 py-2 cursor-pointer font-semibold hover:bg-[var(--primary)] border-[var(--primary)] border-2 text-[var(--secondary)] text-md w-full sm:w-auto"
            >
              View Details
            </button>
            <button
              onClick={handleRemove}
              className="bg-[var(--primary)] hover:bg-white rounded-lg border-2 border-[var(--primary)] px-5 py-2 text-[var(--secondary)] text-md font-semibold cursor-pointer w-full sm:w-auto"
            >
              Remove
            </button>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default WishListCard;
