import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Task } from '../types/Task';
import { taskService } from '../services/taskService';

interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { title?: string; description?: string; completed?: boolean } }) =>
      taskService.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setIsEditing(false);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleToggleComplete = () => {
    updateTaskMutation.mutate({
      id: task.id,
      data: { completed: !task.completed },
    });
  };

  const handleSave = () => {
    updateTaskMutation.mutate({
      id: task.id,
      data: { title, description },
    });
  };

  const handleDelete = () => {
    deleteTaskMutation.mutate(task.id);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Task title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Task description"
        />
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          disabled={updateTaskMutation.isPending}
        >
          {updateTaskMutation.isPending ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
          disabled={updateTaskMutation.isPending}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
        className="w-5 h-5"
        disabled={updateTaskMutation.isPending}
      />
      <div className="flex-1">
        <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className={`text-gray-600 ${task.completed ? 'line-through' : ''}`}>
            {task.description}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 text-blue-600 hover:text-blue-800"
          disabled={updateTaskMutation.isPending || deleteTaskMutation.isPending}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-red-600 hover:text-red-800"
          disabled={updateTaskMutation.isPending || deleteTaskMutation.isPending}
        >
          {deleteTaskMutation.isPending ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}; 