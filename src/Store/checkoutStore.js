import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { API_URL,useAuthStore } from "./authStore";


export const useCheckoutStore = create(
  persist(
    (set, get) => ({
      response: null,
      loading: false,
      error: null,

      startCheckout: async () => {
        const token = useAuthStore.getState().accessToken;
        set({ loading: true, error: null });
 
        try {
          const res = await axios.post(
            `${API_URL}/api/checkout/start`,
            {},
             
            {
              withCredentials:true, 
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            }
          );
          set({ response: res.data, loading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message,
            loading: false,
          });
        }
      },

      submitShipping: async ({ checkout_id, shipping_method, shipping_code }) => {
        const token = useAuthStore.getState().accessToken;
        set({ loading: true, error: null });

        try {
          const res = await axios.post(
            `${API_URL}/api/checkout/shipping`,
            {
              checkout_id,
              shipping_method,
              shipping_code,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: 'application/json',
              },
            }
          );
          set({ response: res.data, loading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Shipping submission failed",
            loading: false,
          });
        }
      },

      submitPayment: async ({ checkout_id, payment_method, payment_code }) => {
        const token = useAuthStore.getState().accessToken;
      
        set({ loading: true, error: null });

        try {
          const res = await axios.post(
            `${API_URL}/api/checkout/payment`,
            {
              checkout_id,
              payment_method,
              payment_code,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          set({ response: res.data, loading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Payment submission failed",
            loading: false,
          });
        }
      },

      applyCoupon: async ({ checkout_id, coupon_code }) => {
        const token = useAuthStore.getState().accessToken;
        set({ loading: true, error: null });

        try {
          const res = await axios.post(
            `${API_URL}/api/checkout/apply-coupon`,
            {
              checkout_id,
              coupon_code,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          set({ response: res.data, loading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Coupon application failed",
            loading: false,
          });
        }
      },

      completeCheckout: async ({ checkout_id, comment }) => {
        const token = useAuthStore.getState().accessToken;
        set({ loading: true, error: null });

        try {
          const res = await axios.post(
            `${API_URL}/api/checkout/complete`,
            {
              checkout_id,
              comment,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          set({ response: res.data, loading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Checkout completion failed",
            loading: false,
          });
        }
      },

      clearCheckout: () => set({ response: null, error: null }),
    }),
    {
      name: "checkout-storage", // localStorage key
    }
  )
);
