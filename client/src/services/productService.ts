import axios from 'axios';
import type { Product, CreateProductInput, UpdateProductInput } from '../types/Product';

const API_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  async getAllProducts(
    search?: string,
    sortBy?: string,
    page?: string,
    limit?: string
  ): Promise<Product[]> {
    const response = await apiClient.get<Product[]>('/products', {
      params: { search, sortBy, page, limit },
    });
    return response.data;
  },

  async addProduct(product: CreateProductInput): Promise<Product> {
    const response = await apiClient.post<Product>(`/products`, product);
    return response.data;
  },

  async updateProduct(id: string | number, product: UpdateProductInput): Promise<Product> {
    const response = await apiClient.put<Product>(`/products/${id}`, product);
    return response.data;
  },

  async deleteProduct(id: string | number): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },

  async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },
};
