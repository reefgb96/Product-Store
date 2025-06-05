"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const productService_1 = require("../services/productService");
exports.productController = {
    getAllProducts: async (req, res, next) => {
        try {
            const { search, sortBy, page, limit } = req.query;
            const products = await productService_1.productService.getAllProducts(search, sortBy, page, limit);
            res.json(products);
        }
        catch (error) {
            next(error);
        }
    },
    getProductById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await productService_1.productService.getProductById(id);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.json(product);
        }
        catch (error) {
            next(error);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const product = await productService_1.productService.createProduct(req.body);
            res.status(201).json(product);
        }
        catch (error) {
            next(error);
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await productService_1.productService.updateProduct(id, req.body);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.json(product);
        }
        catch (error) {
            next(error);
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const { id } = req.params;
            await productService_1.productService.deleteProduct(id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    },
};
