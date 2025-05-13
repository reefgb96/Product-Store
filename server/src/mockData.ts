import { Task } from './models/Task';

export const seedMockTasks = async () => {
  const mockTasks = [
    {
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, and cheese',
      completed: false,
    },
    {
      title: 'Walk the dog',
      description: 'Take Bella for a 30-minute walk',
      completed: false,
    },
    {
      title: 'Finish coding project',
      description: 'Push final changes and write README',
      completed: true,
    },
  ];

  try {
    await Task.bulkCreate(mockTasks, { validate: true });
    console.log('Mock tasks seeded successfully.');
  } catch (error) {
    console.error('Failed to seed mock tasks:', error);
  }
};
