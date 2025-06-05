"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDbManager = void 0;
const Product_1 = require("../models/Product");
const sequelize_1 = require("sequelize");
exports.productDbManager = {
    async getAllProducts(search, sortBy) {
        try {
            const whereClause = {};
            if (search) {
                whereClause[sequelize_1.Op.or] = [
                    { title: { [sequelize_1.Op.iLike]: `%${search}%` } },
                    { description: { [sequelize_1.Op.iLike]: `%${search}%` } },
                ];
            }
            const orderClause = [];
            if (sortBy === "name") {
                orderClause.push(["title", "ASC"]);
            }
            else if (sortBy === "recent") {
                orderClause.push(["createdAt", "DESC"]);
            }
            else {
                orderClause.push(["createdAt", "DESC"]);
            }
            const products = await Product_1.Product.findAll({
                where: whereClause,
                order: orderClause,
            });
            return products;
        }
        catch (error) {
            console.error("Error in productDbManager.getAllProducts:", error);
            throw error;
        }
    },
    async createProduct(productData) {
        try {
            const newProduct = await Product_1.Product.create({
                title: productData.title,
                description: productData.description || "",
                price: productData.price || 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return newProduct;
        }
        catch (error) {
            console.error("Error in productDbManager.createProduct:", error);
            throw error;
        }
    },
    async updateProduct(id, productData) {
        try {
            const product = await Product_1.Product.findByPk(id);
            if (!product) {
                return null;
            }
            await product.update(productData);
            return product;
        }
        catch (error) {
            console.error("Error in productDbManager.updateProduct:", error);
            throw error;
        }
    },
    async deleteProduct(id) {
        try {
            const product = await Product_1.Product.findByPk(id);
            if (!product) {
                return false;
            }
            await product.destroy();
            return true;
        }
        catch (error) {
            console.error("Error in productDbManager.deleteProduct:", error);
            throw error;
        }
    },
    async getProductById(id) {
        try {
            const product = await Product_1.Product.findByPk(id);
            return product;
        }
        catch (error) {
            console.error("Error in productDbManager.getProductById:", error);
            throw error;
        }
    },
};
