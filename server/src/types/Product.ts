import { Optional } from "sequelize";

export type ProductAttributes = {
  id: number;
  title: string;
  description?: string;
  price: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProductInput = {
  title: string;
  description?: string;
  price: number;
};

export type UpdateProductInput = {
  title?: string;
  description?: string;
  price?: number;
  completed?: boolean;
};

export type Product = ProductAttributes;

export type ProductCreationAttributes = Optional<
  ProductAttributes,
  "id" | "createdAt" | "updatedAt"
>; // Adjust optional fields based on your model defaults
