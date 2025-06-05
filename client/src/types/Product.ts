// This represents the attributes stored in the database
export type Product = {
  id: number; // Assuming id is number based on server model
  title: string;
  description?: string;
  price: number;
  completed: boolean; // Add completed to client-side Product type
  createdAt: string;
  updatedAt: string;
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
