'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { useOrderStore } from '@/Store/orders';
import { useDownloadsStore } from '@/Store/downloads';
import { useproductStore } from '@/Store/productStore';
import { API_URL } from '@/Store/authStore';

const Downloads = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 5;

  const {
    orders = [],
    fetchOrders,
    isLoading,
    error,
    totalPages = 1,
  } = useOrderStore();

  const {
    fetchDownloadLink,
    downloadLinks,
  } = useDownloadsStore();

  const {
    fetchProductWithPriceById,
    productsWithPrice = [],
  } = useproductStore();

  useEffect(() => {
    fetchOrders(page, limit);
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      for (const order of orders) {
        for (const product of order.products || []) {
          const productId = product.product_id;
          const optionValueId = product.options?.[0]?.product_option_value_id;

          if (productId) {
            await fetchProductWithPriceById(productId);
          }

          if (productId && optionValueId) {
            try {
              await fetchDownloadLink(productId, optionValueId);
            } catch (error) {
              console.error('Error fetching download link:', error);
            }
          }
        }
      }
    };

    if (orders.length > 0) {
      fetchData();
    }
  }, [orders]);

  const handlePageChange = (_, value) => setPage(value);

  const handleSearchChange = (e) =>
    setSearchQuery(e.target.value.toLowerCase());

  const getProductImage = (product_id) => {
    const enriched = productsWithPrice.find(
      (p) => p.product_id === product_id || p.id === product_id
    );
    return enriched?.image || null;
  };

  const filteredOrders = orders.filter((order) => {
    const matchesOrderId = order.order_id?.toString().toLowerCase().includes(searchQuery);
    const matchesProductName = order.products?.some((p) =>
      p.name?.toLowerCase().includes(searchQuery)
    );
    return matchesOrderId || matchesProductName;
  });

  return (
    <div className="rounded-xl border-2 border-[var(--primary)] mx-4 md:mx-8">
      <h6 className="border-b-2 border-[var(--primary)] text-2xl font-semibold p-4 text-[var(--secondary)]">
        Downloads
      </h6>

      <div className="px-4 flex justify-center my-5 pb-2">
        <input
          type="text"
          placeholder="Search by Order ID or Product Name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-1/2 px-4 py-2 border-2 border-[var(--primary)] rounded-lg focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-4 p-4">
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <CircularProgress />
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && filteredOrders.length === 0 && (
          <p>No matching orders found.</p>
        )}

        {!isLoading &&
          filteredOrders.map((order) => (
            <div
              key={order.order_id}
              className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-xl gap-4 p-4"
            >
              <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
                {/* Product Info */}
                <div className="flex-1 border-r-2 border-black pr-6">
                  <ul className="space-y-4">
  {order.products?.map((product) => {
    const imageUrl = getProductImage(product.product_id);
    const key = `${order.order_id}-${product.product_id}`;

    return (
      <li key={key} className="pb-2">
        <div className="flex items-center gap-4">
          <div className="w-[90px] h-[90px] relative border rounded overflow-hidden flex-shrink-0">
            {imageUrl ? (
              <Image
                src={`${API_URL}/${imageUrl}`}
                alt={product.name || 'Product Image'}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 bg-gray-100">
                No Image
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex justify-between my-1">
              <span className="font-semibold text-[var(--secondary)]">Name</span>
              <span className="text-[var(--secondary)]">
                {product.name || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between my-1">
              <span className="font-semibold text-[var(--secondary)]">Price</span>
              <span className="font-bold text-[var(--primary)]">
                ₹{product.price?.toFixed(2) || '0.00'}
              </span>
            </div>
          </div>
        </div>
      </li>
    );
  })}
</ul>

                </div>

                {/* Order Info */}
                <div className="flex-1 border-r-2 border-black pr-6">
                  <ul>
                    <li className="flex justify-between my-2">
                      <span className="font-semibold text-[var(--secondary)]">Order ID</span>
                      <span className="text-[var(--secondary)]">{order.order_id}</span>
                    </li>
                    <li className="flex justify-between my-2">
                      <span className="font-semibold text-[var(--secondary)]">Order Date</span>
                      <span className="text-[var(--secondary)]">
                        {order.date_added
                          ? new Date(order.date_added).toLocaleDateString()
                          : 'N/A'}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Download Button */}
                <div className="flex items-center mt-2">
               
                  <a
                    href={`${API_URL}${downloadLinks}`}
                    download
                    className="text-sm text-white font-semibold bg-[var(--primary)] px-3 py-1 rounded-md hover:bg-opacity-90"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}

        {totalPages > 1 && (
          <Stack spacing={2} alignItems="center" className="mt-6">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
              shape="rounded"
              size="large"
            />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default Downloads;
