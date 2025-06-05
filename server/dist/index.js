"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const mockData_1 = require("./mockData");
const productRoutes_1 = require("./routes/productRoutes");
const errorService_1 = require("./services/errorService");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", productRoutes_1.productRoutes);
app.use((err, req, res, next) => {
    (0, errorService_1.handleServiceError)(err, res, next);
});
database_1.sequelize
    .sync({ alter: true })
    .then(() => {
    return (0, mockData_1.seedMockProducts)();
})
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error("Failed to start server:", error);
});
