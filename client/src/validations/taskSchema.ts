import { z } from 'zod';

export const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;
