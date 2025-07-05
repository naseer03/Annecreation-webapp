'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  Tabs,
  Tab,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import BreadCrum from '@/components/BreadCrum/BreadCrum';
import WishListCard from '@/components/WishListCard/WishListCard';

import useWishlistStore from '@/Store/wishlistStore';
import { usecategoryStore } from '@/Store/categoryStore';
import { useAuthStore } from '@/Store/authStore';
import { useproductStore } from '@/Store/productStore';

const Wishlist = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { wishlist, getWishlistItem } = useWishlistStore();
  const { fetchCategories, category } = usecategoryStore();
  const accessToken = useAuthStore((state) => state.accessToken);
  const { fetchProductWithPriceById, productsWithPrice, resetProductsWithPrice } = useproductStore();

  useEffect(() => {
    const fetchInitial = async () => {
      if (!accessToken) return;
      setIsLoading(true);
      await Promise.all([fetchCategories(), getWishlistItem()]);
    };
    fetchInitial();
  }, [accessToken]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      resetProductsWithPrice();

      if (!wishlist || wishlist.length === 0) {
        setIsLoading(false);
        return;
      }

      await Promise.all(
        wishlist.map((item) => fetchProductWithPriceById(item.product_id))
      );

      setIsLoading(false);
    };

    if (accessToken) {
      fetchProductDetails();
    }
  }, [wishlist, accessToken]);

  const subcategories = useMemo(
    () => ['All', ...new Set(category.map((cat) => cat.name))],
    [category]
  );

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const filteredWishlist = useMemo(() => {
    if (!wishlist || wishlist.length === 0) return [];
    if (activeTab === 0) return productsWithPrice;

    const selectedCategory = subcategories[activeTab]?.toLowerCase();
    return productsWithPrice.filter(
      (item) => item.category?.toLowerCase() === selectedCategory
    );
  }, [wishlist, productsWithPrice, activeTab, subcategories]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full py-10">
          <CircularProgress color="warning" />
        </div>
      );
    }

    if (wishlist.length === 0) {
      return <p className="text-center text-gray-500">Your wishlist is empty.</p>;
    }

    if (filteredWishlist.length > 0) {
      return filteredWishlist.map((item) => (
        <WishListCard key={item.product_id} item={item} />
      ));
    }

    return <p className="text-center text-gray-500">No items found in this category.</p>;
  };

  return (
    <>
      <BreadCrum
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'WishList', href: '/WishList' },
        ]}
      />

      <Container className="my-20">
        <h1 className="text-center text-3xl font-bold text-[var(--secondary)] mb-10">
          WishList
        </h1>

        {!accessToken ? (
          <Box className="text-center text-lg text-gray-600 py-10">
            Please login to view your wishlist.
          </Box>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-1/4 bg-white pt-0 border-b-2 border-[var(--primary)] max-h-[100vh] overflow-y-auto">
              <div className="sticky top-0 z-30 bg-white text-center py-3 border-2 border-[var(--primary)] font-bold">
                <p className="text-transparent gradient-text">All Categories</p>
              </div>

              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={activeTab}
                onChange={handleChange}
                sx={{
                  '& .MuiTabs-indicator': {
                    left: 0,
                    backgroundColor: '#f59e0b',
                  },
                  '& .MuiTab-root': {
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    color: 'black',
                    marginBottom: '8px',
                    fontSize: '0.875rem',
                    '&.Mui-selected': {
                      color: 'white',
                      fontWeight: 600,
                      backgroundColor: '#f59e0b',
                    },
                  },
                  border: '1px solid var(--primary)',
                }}
              >
                {subcategories.map((categoryName, index) => (
                  <Tab key={categoryName} label={categoryName} />
                ))}
              </Tabs>
            </div>

            {/* Wishlist Content */}
            <div className="w-full md:w-3/4 bg-white/10 rounded-lg p-4 md:p-6 text-[var(--secondary)]">
              {renderContent()}
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Wishlist;
