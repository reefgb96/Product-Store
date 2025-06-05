"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
// src/models/Task.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Product",
    tableName: "products",
});
