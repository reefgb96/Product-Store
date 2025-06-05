import { Request, Response, NextFunction } from "express";
import { productService } from "../services/productService";

export const productController = {
  getAllProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search, sortBy, page, limit } = req.query;
      const products = await productService.getAllProducts(
        search as string,
        sortBy as string,
        page as string,
        limit as string,
      );
      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  getProductById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await productService.updateProduct(id, req.body);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await productService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
