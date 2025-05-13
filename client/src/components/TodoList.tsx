import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '.././services/taskService';
import { Header } from './Header';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import type { TaskFormData } from '../validations/taskSchema';

export const TodoList = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getAllTasks,
    enabled: true
  });

  const createTaskMutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTitle('');
      setDescription('');
    },
  });

  const handleAddTask = (data: TaskFormData) => {
    if (!title.trim()) return;

    createTaskMutation.mutate({ title, description: data.description?.trim() || undefined, });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header />
      <TaskForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        onSubmit={handleAddTask}
        isSubmitting={createTaskMutation.isPending}
      />
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
          {error instanceof Error ? error.message : 'An error occurred'}
        </div>
      )}
      <TaskList tasks={tasks} />
    </div>
  );
};
