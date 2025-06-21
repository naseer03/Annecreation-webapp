import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosClient from '@/lib/axiosClient'; // ✅ Our auto-refresh-aware client

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      cartCount: 0,

      getCartItem: async () => {
        try {
          const response = await axiosClient.get('/api/cart');
          set({ cart: response.data, cartCount: response.data.length });
        } catch (error) {
          console.error('Error fetching cart items:', error?.response?.data || error.message);
        }
      },

      addToCart: async (item) => {
  try {
    const options = (item.options || []).filter(
      (opt) => opt.option_id && opt.option_value_id
    );

    await axiosClient.post('/api/cart/add', {
      product_id: item.product_id,
      quantity: item.quantity || 1,
      options,
    });

    await get().getCartItem();
  } catch (error) {
    console.error('Failed to add to cart:', error?.response?.data || error.message);
  }
},

      removeFromCart: async (_id) => {
        try {
          await axiosClient.delete(`/api/cart/remove/${_id}`);
          await get().getCartItem();
        } catch (error) {
          console.error('Failed to remove from cart:', error?.response?.data || error.message);
        }
      },

      decreaseQuantity: (id) =>
        set((state) => {
          const item = state.cart.find((i) => i.id === id);
          if (!item) return state;

          if ((item.quantity || 1) <= 1) {
            return {
              cart: state.cart.filter((i) => i.id !== id),
              cartCount: state.cartCount - 1,
            };
          }

          return {
            cart: state.cart.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        }),

      clearCart: () => set({ cart: [], cartCount: 0 }),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cart: state.cart,
        cartCount: state.cartCount,
      }),
    }
  )
);

export default useCartStore;
