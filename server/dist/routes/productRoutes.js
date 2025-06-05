"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
exports.productRoutes = router;
// Define product routes
router.get("/products", productController_1.productController.getAllProducts);
router.get("/products/:id", productController_1.productController.getProductById);
router.post("/products", productController_1.productController.createProduct);
router.put("/products/:id", productController_1.productController.updateProduct);
router.delete("/products/:id", productController_1.productController.deleteProduct);
