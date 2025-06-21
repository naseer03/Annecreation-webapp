import { create } from 'zustand';
import axios from 'axios';
import { useAuthStore, API_URL } from './authStore';

export const usecategoryStore = create((set) => ({
  category: [],
  products: [], 
  isLoading: false,
  error: null,

  fetchCategories: async () => {
   

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/api/categories/top?limit=40`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
  
        },
      });

      set({
        category: response.data.categories,
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

 fetchCategoryProducts: async (category_id, page = 1, sort = 'price_asc') => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.get(
      `${API_URL}/api/categories/${category_id}?page=${page}&sort=${sort}&order=asc`,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    set({ products: response.data, isLoading: false });
  } catch (error) {
    set({
      isLoading: false,
      error: error?.response?.data?.message || error.message,
    });
  }
}

}));
