import { z } from 'zod';

export const ProductsFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(100).optional(),
});

export type ProductsFormData = z.infer<typeof ProductsFormSchema>;
