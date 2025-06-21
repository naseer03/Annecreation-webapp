'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import Orderdetails from './Orderdetails';
import { useOrderStore } from '@/Store/orders';
import { useproductStore } from '@/Store/productStore';
import { API_URL } from '@/Store/authStore';

const OrderHistory = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    orders = [],
    fetchOrders,
    isLoading,
    error,
    totalPages = 1,
  } = useOrderStore();

  const {
    fetchProductWithPriceById,
    productsWithPrice = [],
  } = useproductStore();

  useEffect(() => {
    fetchOrders(page, limit);
  }, [page, fetchOrders]);

  useEffect(() => {
    const fetchImagesForOrders = async () => {
      for (const order of orders) {
        for (const product of order.products || []) {
          if (product?.product_id) {
            await fetchProductWithPriceById(product.product_id);
          }
        }
      }
    };

    if (orders.length > 0) {
      fetchImagesForOrders();
    }
  }, [orders]);

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const getProductImage = (product_id) => {
    const enriched = productsWithPrice.find(
      (p) => p.product_id === product_id || p.id === product_id
    );
    return enriched?.image || null;
  };

  if (showDetails && selectedOrder) {
    return (
      <Orderdetails order={selectedOrder} onClose={() => setShowDetails(false)} />
    );
  }

  return (
    <div className="rounded-xl border-2 border-[var(--primary)] mx-4 md:mx-8">
      <h6 className="border-b-2 border-[var(--primary)] text-2xl font-semibold p-4 text-[var(--secondary)]">
        Order History
      </h6>

      <div className="flex flex-col gap-4 p-4">
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <CircularProgress />
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && orders.length === 0 && <p>No orders found.</p>}

        {!isLoading &&
          orders.map((order) => (
            <div
              key={order.order_id}
              className="bg-white shadow-lg rounded-xl p-4 flex flex-col md:flex-row gap-4 min-h-[140px]"
            >
              {/* Products Info */}
              <div className="flex-1 border-r-2 border-black pr-6 flex items-center">
                <ul className="space-y-2 w-full">
                  {order.products?.map((product, index) => {
                    const imageUrl = getProductImage(product.product_id);

                    return (
                      <li key={index} className="flex gap-4 items-center">
                        <div className="w-[90px] h-[90px] border rounded overflow-hidden flex-shrink-0 relative">
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
                          <div className="flex justify-between">
                            <span className="font-semibold text-[var(--secondary)]">Name</span>
                            <span className="text-[var(--secondary)]">{product.name || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold text-[var(--secondary)]">Price</span>
                            <span className="font-bold text-[var(--primary)]">
                              ₹{product.price?.toFixed(2) || '0.00'}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  }) || <li>No products</li>}
                </ul>
              </div>

              {/* Order Info */}
              <div className="flex-1 border-r-2 border-black pr-6 flex items-center">
                <ul className="w-full space-y-2">
                  <li className="flex justify-between">
                    <span className="font-semibold text-[var(--secondary)]">Order ID</span>
                    <span className="text-[var(--secondary)]">{order.order_id}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-[var(--secondary)]">Order Date</span>
                    <span className="text-[var(--secondary)]">
                      {order.date_added
                        ? new Date(order.date_added).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* View Button */}
              <div className="flex items-center justify-end sm:justify-center mt-4 sm:mt-0 w-full md:w-auto">
                <button
                  aria-label="View Order Details"
                  className="bg-[var(--primary)] border-2 border-[var(--primary)] hover:bg-white text-white hover:text-[var(--primary)] font-semibold px-6 py-2 rounded-lg transition cursor-pointer"
                  onClick={() => handleViewClick(order)}
                >
                  View
                </button>
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

export default OrderHistory;
