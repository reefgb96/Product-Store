import { useState } from 'react';
import { taskFormSchema } from '../validations/taskSchema';
import type { TaskFormData } from '../validations/taskSchema';

type TaskFormProps = {
  title: string;
  description: string;
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
  onSubmit: (data: TaskFormData) => void;
  isSubmitting: boolean;
};

export const TaskForm = ({
  title,
  description,
  setTitle,
  setDescription,
  onSubmit,
  isSubmitting,
}: TaskFormProps) => {
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = taskFormSchema.safeParse({ title, description });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        title: fieldErrors.title?.[0],
        description: fieldErrors.description?.[0],
      });
      return;
    }

    setErrors({});
    onSubmit(result.data); // Pass only valid data
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="px-4 py-2 border rounded w-full"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            className="px-4 py-2 border rounded w-full"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};
