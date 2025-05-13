import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:3000/api';

// API client
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export type Item = {
  id: string;
  name: string;
  description: string;
};

// API functions
export const fetchItems = async (): Promise<Item[]> => {
  const { data } = await apiClient.get('/items');
  return data;
};

export const fetchItem = async (id: string): Promise<Item> => {
  const { data } = await apiClient.get(`/items/${id}`);
  return data;
};

export const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
  const { data } = await apiClient.post('/items', item);
  return data;
};

export const updateItem = async ({ id, ...item }: Item): Promise<Item> => {
  const { data } = await apiClient.put(`/items/${id}`, item);
  return data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await apiClient.delete(`/items/${id}`);
};

// React Query hooks
export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
  });
};

export const useItem = (id: string) => {
  return useQuery({
    queryKey: ['items', id],
    queryFn: () => fetchItem(id),
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}; 