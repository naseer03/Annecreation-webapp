'use client';

import React from 'react';

const Orderdetails = ({ order, onClose }) => {
  if (!order) return null;

  const product = order.products?.[0];
  const option = product?.options?.[0];

  return (
    <div className="rounded-xl ml-5 border-2 border-[var(--primary)] text-sm">
      <div className="border-b-2 border-[var(--primary)] text-2xl font-semibold p-4 flex justify-between items-center">
        Order Details
        <button
          onClick={onClose}
          className="text-[var(--primary)] text-sm border border-[var(--primary)] px-3 rounded-lg hover:bg-[var(--primary)] hover:text-white transition"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span className="text-[var(--secondary)]">Order ID</span>
            <span className="text-[var(--secondary)B2]">{order.order_id || 'N/A'}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-[var(--secondary)]">Added Date</span>
            <span className="text-[var(--secondary)B2]">
              {order.date_added ? new Date(order.date_added).toLocaleDateString() : 'N/A'}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-[var(--secondary)]">Status</span>
            <span className="text-[var(--secondary)B2]">{order.order_status_id || 'N/A'}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-[var(--secondary)]">Quantity</span>
            <span className="text-[var(--secondary)B2]">{order.product_count || 1}</span>
          </li>
        </ul>

        <ul className="space-y-2">
          <li className="font-medium text-[var(--secondary)]">Payment Address</li>
          <li className="text-[var(--secondary)B2]">{order.paymentAddress || 'N/A'}</li>
        </ul>

        <ul className="space-y-2">
          <li className="font-medium text-[var(--secondary)]">Payment Method</li>
          <li
            className="text-[var(--secondary)B2]"
            dangerouslySetInnerHTML={{ __html: order.payment_method || 'N/A' }}
          />
        </ul>
      </div>

      <hr color="var(--secondary)" className="my-4" />

      <h4 className="text-[var(--secondary)] font-bold text-center text-2xl">Product Details</h4>

      <div className="flex flex-col sm:flex-row justify-evenly p-4 text-sm">
        <ul className="w-full sm:w-1/3 space-y-2">
          <li className="flex justify-between">
            <span className="text-[var(--secondary)]">Product Name</span>
            <span className="text-[var(--secondary)B2]">{product?.name || 'N/A'}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-[var(--secondary)]">Machine</span>
            <span className="text-[var(--secondary)B2]">{option?.value || 'N/A'}</span>
          </li>
        </ul>

        <ul className="w-full sm:w-1/4 space-y-2 mt-4 sm:mt-0">
          <li className="flex justify-between">
            <span className="text-[var(--secondary)]">Discount Price</span>
            <span className="text-[var(--secondary)]">₹{order.discount || 0}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-[var(--secondary)]">Total Price</span>
            <span className="text-transparent bg-clip-text bg-[linear-gradient(to_left,_#996E19_10%,_var(--primary))]">
              ₹{typeof order.total === 'number' ? order.total.toFixed(2) : '0.00'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Orderdetails;
