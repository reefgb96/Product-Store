// src/models/Task.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export type ProductAttributes = {
  id?: number;
  title: string;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type TaskCreationAttributes = Optional<ProductAttributes, "id">;

export class Product
  extends Model<ProductAttributes, TaskCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
  },
);
