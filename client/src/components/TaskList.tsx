import { useQueryClient } from '@tanstack/react-query';
import type { Task } from '.././types/Task';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: TaskListProps) => {
  const queryClient = useQueryClient();

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks yet. Add one above!</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={() => queryClient.invalidateQueries({ queryKey: ['tasks'] })}
        />
      ))}
    </div>
  );
};
