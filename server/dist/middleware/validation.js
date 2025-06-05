"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateUpdateProduct = exports.validateCreateProduct = void 0;
const express_validator_1 = require("express-validator");
// Validation rules for creating a product
exports.validateCreateProduct = [
    (0, express_validator_1.body)("title").trim().notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("description").optional().trim(),
    (0, express_validator_1.body)("price")
        .isNumeric()
        .withMessage("Price must be a number")
        .toFloat()
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than zero"),
];
// Validation rules for updating a product
exports.validateUpdateProduct = [
    (0, express_validator_1.body)("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty if provided"),
    (0, express_validator_1.body)("description").optional().trim(),
    (0, express_validator_1.body)("price")
        .optional()
        .isNumeric()
        .withMessage("Price must be a number if provided")
        .toFloat()
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than zero if provided"),
    (0, express_validator_1.body)("completed")
        .optional()
        .isBoolean()
        .withMessage("Completed must be a boolean if provided"),
];
// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
