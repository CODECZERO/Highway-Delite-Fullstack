import axios from 'axios';
import { Experience, BookingData, Booking, PromoCodeValidation } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const experienceAPI = {
  getAll: async (): Promise<Experience[]> => {
    const response = await api.get('/experiences');
    return response.data.data;
  },

  getById: async (id: string): Promise<Experience> => {
    const response = await api.get(`/experiences/${id}`);
    return response.data.data;
  },
};

export const bookingAPI = {
  create: async (bookingData: BookingData): Promise<Booking> => {
    const response = await api.post('/bookings', bookingData);
    return response.data.data;
  },

  getById: async (id: string): Promise<Booking> => {
    const response = await api.get(`/bookings/${id}`);
    return response.data.data;
  },
};

export const promoAPI = {
  validate: async (code: string, subtotal: number): Promise<PromoCodeValidation> => {
    const response = await api.post('/promo/validate', { code, subtotal });
    return response.data.data;
  },
};

export default api;
