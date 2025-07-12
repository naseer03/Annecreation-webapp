"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosClient from "@/lib/axiosClient";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isResetPasswordLoading: null,
      resetPasswordError: null,
      resetPasswordSuccess: false,

      setAccessToken: (token) => set({ accessToken: token }),

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await axiosClient.post("/api/customers/login", {
            email,
            password,
          });

          set({
            user: data.customer,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });

          return { success: true };
        } catch (error) {
          const errorMsg =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error.message;

          set({
            isLoading: false,
            error: errorMsg,
            isAuthenticated: false,
          });

          return { success: false, error: errorMsg };
        }
      },

      register: async (formData) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await axiosClient.post(
            "/api/customers/register",
            formData
          );

          set({
            user: data.customer,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });

          return { success: true };
        } catch (error) {
          const errorMsg =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error.message;

          set({
            isLoading: false,
            error: errorMsg,
            isAuthenticated: false,
          });

          return { success: false, error: errorMsg };
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });

        try {
          const { data } = await axiosClient.put(
            "/api/customers/profile",
            profileData
          );

          set({
            user: { ...get().user, ...data.customer },
            isLoading: false,
          });

          return { success: true };
        } catch (error) {
          const errorMsg =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error.message;

          set({ isLoading: false, error: errorMsg });

          return { success: false, error: errorMsg };
        }
      },

      changePassword: async (passwordData) => {
        set({ isLoading: true, error: null });

        try {
          await axiosClient.post(
            "/api/customers/change-password",
            passwordData
          );

          set({ isLoading: false });

          return { success: true };
        } catch (error) {
          const errorMsg =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error.message;

          set({ isLoading: false, error: errorMsg });

          return { success: false, error: errorMsg };
        }
      },

      getProfile: async () => {
        set({ isLoading: true, error: null });

        try {
          const { data } = await axiosClient.get("/api/customers/profile");

          set({
            user: data,
            isLoading: false,
          });

          return { success: true, data };
        } catch (error) {
          const errorMsg =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error.message;

          set({ isLoading: false, error: errorMsg });

          return { success: false, error: errorMsg };
        }
      },

      resetPassword: async (passwordData) => {
        set({ isResetPasswordLoading: true, resetPasswordError: null, resetPasswordSuccess: false });

        try {
          await axiosClient.post("/api/customers/reset-password", passwordData);

          set({ isResetPasswordLoading: false , resetPasswordSuccess: true});

          return { success: true };
        } catch (error) {
          const errorMsg =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error.message;

          set({ isResetPasswordLoading: false, resetPasswordError: errorMsg });

          return { isResetPasswordLoading: false, resetPasswordError: errorMsg, resetPasswordSuccess: false };
        }
      },

      clearError: () => set({ error: null, resetPasswordError: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
