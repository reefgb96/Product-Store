"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const productDbManager_1 = require("../db-managers/productDbManager");
exports.productService = {
    async getAllProducts(search, sortBy, page, limit) {
        try {
            return await productDbManager_1.productDbManager.getAllProducts(search, sortBy);
        }
        catch (error) {
            throw error;
        }
    },
    async createProduct(data) {
        try {
            return await productDbManager_1.productDbManager.createProduct(data);
        }
        catch (error) {
            throw error;
        }
    },
    async updateProduct(id, data) {
        try {
            return await productDbManager_1.productDbManager.updateProduct(id, data);
        }
        catch (error) {
            throw error;
        }
    },
    async deleteProduct(id) {
        try {
            return await productDbManager_1.productDbManager.deleteProduct(id);
        }
        catch (error) {
            throw error;
        }
    },
    async getProductById(id) {
        try {
            return await productDbManager_1.productDbManager.getProductById(id);
        }
        catch (error) {
            throw error;
        }
    },
};
