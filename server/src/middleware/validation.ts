import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

// Validation rules for creating a product
export const validateCreateProduct = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").optional().trim(),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .toFloat()
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than zero"),
];

// Validation rules for updating a product
export const validateUpdateProduct = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty if provided"),
  body("description").optional().trim(),
  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number if provided")
    .toFloat()
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than zero if provided"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean if provided"),
];

// Middleware to handle validation results
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
