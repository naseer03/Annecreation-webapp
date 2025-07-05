import { create } from 'zustand';
import axiosClient from '@/lib/axiosClient';


export const useDownloadsStore = create((set, get) => ({
  isLoading: false,
  error: null,
  downloadLinks: {},

  fetchDownloadLink: async ( productId, optionValueId) => {


    try {
      const res = await axiosClient.get(
        `/api/products/${productId}/download/${optionValueId}/link`
      );
      
      set({downloadLinks:res.data.download_url, isLoading: false,})
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to get download link';
      set({ error: errorMsg });
    }
  },

  
}));
