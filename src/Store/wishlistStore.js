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

      getWishlistItem: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.get('/api/wishlist');
          set({
            wishlist: response.data.products,
            wishlistCount: response.data.count,
          });
        } catch (error) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            'Unknown error';
          console.error('Failed to fetch wishlist:', message);
          set({ error: message });
        } finally {
          set({ loading: false });
        }
      },

      addToWishlist: async (product) => {
        try {
          await axiosClient.post('/api/wishlist/add', {
            product_id: product?.id || product?.product_id,
          });

          await get().getWishlistItem();
        } catch (error) {
          console.error('Failed to add to wishlist:', error?.response || error);
        }
      },

      removeFromWishlist: async (product_id) => {
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
            };
          });
        } catch (error) {
          console.error('Failed to remove from wishlist:', error?.response || error);
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
