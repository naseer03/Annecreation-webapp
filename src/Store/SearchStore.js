import { create } from 'zustand'
import { API_URL, useAuthStore } from './authStore'
import axios from 'axios'

export const useSearchStore = create((set) => ({
  matchingProducts: [],
  loading: false,
  error: null,

  fetchMatchingProducts: async (searchTerm) => {
    set({ loading: true, error: null })
    try {
      const token = useAuthStore.getState().accessToken  

      const response = await axios.get(`${API_URL}/api/search?query=${searchTerm}`, {
        withCredentials:true, 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      set({ matchingProducts: response.data.products, loading: false })
    } catch (err) {
      set({ error: err.message || 'Error fetching products', loading: false })
    }
  },

  clearMatchingProducts: () => set({ matchingProducts: [], error: null }),
}))
