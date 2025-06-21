import { create } from 'zustand';
import axiosClient from '@/lib/axiosClient'; // ✅ uses refresh token logic

export const useOrderStore = create((set) => ({
  orders: [],
  totalOrders: 0,
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,

  fetchOrders: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosClient.get(`/api/orders/my-orders?page=${page}&limit=${limit}`);

      const { orders, totalCount } = response.data;

      set({
        orders,
        totalOrders: totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        isLoading: false,
      });
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message;

      set({ isLoading: false, error: errorMsg });
    }
  },
}));
