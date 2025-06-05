import express from "express";
import { productController } from "../controllers/productController";

const router = express.Router();

// Define product routes
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

export { router as productRoutes };
