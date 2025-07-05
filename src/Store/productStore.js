import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from './authStore';

export const useproductStore = create((set, get) => ({
  products: [],
  productDetail: null,
  isProductsLoading: false,
  isProductsPriceLoading: false,
  productsWithPrice: [], // ✅ ADD THIS
  isProductDetailLoading: false,
  error: null,

  // Fetch all base products
  fetchProducts: async (params = {}) => {
    set({ isProductsLoading: true, error: null });
    try {
      const query = new URLSearchParams(params).toString();
      const url = `${API_URL}/api/products${query ? '?' + query : ''}`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: { Accept: 'application/json' },
      });
      set({ products: res.data.products, isProductsLoading: false });
    } catch (err) {
      set({ error: 'Failed to load products', isProductsLoading: false });
    }
  },

  // Fetch single product by ID
  fetchProductById: async (product_id, params = {}) => {
    set({ isProductDetailLoading: true, error: null });
    try {
      const query = new URLSearchParams(params).toString();
      const url = `${API_URL}/api/products/${product_id}/${query ? '?' + query : ''}`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: { Accept: 'application/json' },
      });
      set({ productDetail: res.data, isProductDetailLoading: false });
    } catch (err) {
      set({ error: 'Failed to load product', isProductDetailLoading: false });
    }
  },

  // ✅ Enriched product fetcher that stores result in productsWithPrice
  fetchProductWithPriceById: async (product_id) => {
  set({ isProductsPriceLoading: true });
  try {
    const url = `${API_URL}/api/products/${product_id}/with-price`;
    const res = await axios.get(url, {
      withCredentials: true,
      headers: { Accept: 'application/json' },
    });

    const newProduct = { ...res.data, product_id };

    // Prevent duplicates
    const existing = get().productsWithPrice || [];
    const isAlreadyAdded = existing.some(
      (p) => p.product_id === product_id
    );
    if (!isAlreadyAdded) {
      set({ productsWithPrice: [...existing, newProduct] });
    }

    return newProduct;
  } catch (err) {
    console.error('Failed to fetch product with price:', err);
    return null;
  } finally {
    set({ isProductsPriceLoading: false });
  }
},

removeProductWithPriceById: (product_id) => {
  const updated = get().productsWithPrice.filter(
    (p) => p.product_id !== product_id && p.id !== product_id
  );
  set({ productsWithPrice: updated });
},



  // ✅ Resets the enriched product list
  resetProductsWithPrice: () => {
    set({ productsWithPrice: [] });
  },
}));
