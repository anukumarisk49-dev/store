import { useQuery } from '@tanstack/react-query';
import { api } from './api';

export function useProducts(params?: { category?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const response = await api.get('/products', { params });
      return response.data;
    },
  });
}

export function useProductById(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data;
    },
  });
}

export function useDeals(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['deals', params],
    queryFn: async () => {
      const response = await api.get('/deals', { params });
      return response.data;
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categories');
      return response.data;
    },
  });
}
