import { Op } from "sequelize";
import { productDbManager } from "../db-managers/productDbManager";
import type { CreateProductInput, UpdateProductInput } from "../types/Product";
import { Product } from "../models/Product";

export const productService = {
  async getAllProducts(
    search?: string,
    sortBy?: string,
    page?: string,
    limit?: string,
  ) {
    try {
      return await productDbManager.getAllProducts(search, sortBy);
    } catch (error) {
      throw error;
    }
  },

  async createProduct(data: CreateProductInput) {
    try {
      return await productDbManager.createProduct(data);
    } catch (error) {
      throw error;
    }
  },

  async updateProduct(id: string, data: UpdateProductInput) {
    try {
      return await productDbManager.updateProduct(id, data);
    } catch (error) {
      throw error;
    }
  },

  async deleteProduct(id: string) {
    try {
      return await productDbManager.deleteProduct(id);
    } catch (error) {
      throw error;
    }
  },

  async getProductById(id: string) {
    try {
      return await productDbManager.getProductById(id);
    } catch (error) {
      throw error;
    }
  },
};
