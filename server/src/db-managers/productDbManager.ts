import { Product } from "../models/Product";
import { Op } from "sequelize";
import type {
  ProductAttributes,
  CreateProductInput,
  UpdateProductInput,
} from "../types/Product";

export const productDbManager = {
  async getAllProducts(search?: string, sortBy?: string): Promise<Product[]> {
    try {
      const whereClause: any = {};
      if (search) {
        whereClause[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ];
      }

      const orderClause: any = [];
      if (sortBy === "name") {
        orderClause.push(["title", "ASC"]);
      } else if (sortBy === "recent") {
        orderClause.push(["createdAt", "DESC"]);
      } else {
        orderClause.push(["createdAt", "DESC"]);
      }

      const products = await Product.findAll({
        where: whereClause,
        order: orderClause,
      });
      return products;
    } catch (error) {
      console.error("Error in productDbManager.getAllProducts:", error);
      throw error;
    }
  },

  async createProduct(productData: CreateProductInput): Promise<Product> {
    try {
      const newProduct = await Product.create({
        title: productData.title,
        description: productData.description || "",
        price: productData.price || 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return newProduct;
    } catch (error) {
      console.error("Error in productDbManager.createProduct:", error);
      throw error;
    }
  },

  async updateProduct(
    id: string,
    productData: UpdateProductInput,
  ): Promise<Product | null> {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return null;
      }
      await product.update(productData);
      return product;
    } catch (error) {
      console.error("Error in productDbManager.updateProduct:", error);
      throw error;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return false;
      }
      await product.destroy();
      return true;
    } catch (error) {
      console.error("Error in productDbManager.deleteProduct:", error);
      throw error;
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const product = await Product.findByPk(id);
      return product;
    } catch (error) {
      console.error("Error in productDbManager.getProductById:", error);
      throw error;
    }
  },
};
