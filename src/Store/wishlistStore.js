import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosClient from '@/lib/axiosClient';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      wishlistCount: 0,
      loading: false,
      error: null,
      successMessage: null,

      // Fetch wishlist
      getWishlistItem: async () => {
        set({ loading: true, error: null, successMessage: null });

        try {
          const response = await axiosClient.get('/api/wishlist');
          set({
            wishlist: response.data.products,
            wishlistCount: response.data.count,
            successMessage: 'Wishlist fetched successfully',
          });
        } catch (error) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            'Failed to fetch wishlist.';
          console.error('Get Wishlist Error:', message);
          set({ error: message });
        } finally {
          set({ loading: false });
        }
      },

      // Add product to wishlist
      addToWishlist: async (product) => {
        set({ error: null, successMessage: null });

        try {
          const response = await axiosClient.post('/api/wishlist/add', {
            product_id: product?.id || product?.product_id,
          });

          // Optionally update UI feedback
          set({ message: response.data?.message });

          // Refresh wishlist
          await get().getWishlistItem();
        } catch (error) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            'Failed to add product to wishlist.';
          console.error('Add Wishlist Error:', message);
          set({ error: message });
        }
      },

      // Remove product from wishlist
      removeFromWishlist: async (product_id) => {
        set({ error: null, successMessage: null });

        try {
          await axiosClient.delete(`/api/wishlist/remove/${product_id}`);

          set((state) => {
            const updatedWishlist = state.wishlist.filter(
              (item) =>
                item.product_id !== product_id && item.id !== product_id
            );

            return {
              wishlist: updatedWishlist,
              wishlistCount: updatedWishlist.length,
              successMessage: 'Removed from wishlist.',
            };
          });
        } catch (error) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            'Failed to remove product from wishlist.';
          console.error('Remove Wishlist Error:', message);
          set({ error: message });
        }
      },
    }),

    {
      name: 'wishlist-storage',
      partialize: (state) => ({
        wishlist: state.wishlist,
        wishlistCount: state.wishlistCount,
      }),
    }
  )
);

export default useWishlistStore;
