import axios from 'axios';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/Task';

const API_URL = 'http://localhost:3000/api';

export const taskService = {
  async getAllTasks(): Promise<Task[]> {
    const response = await axios.get<Task[]>(`${API_URL}/tasks`);
    return response.data;
  },

  async createTask(task: CreateTaskInput): Promise<Task> {
    const response = await axios.post<Task>(`${API_URL}/tasks`, task);
    return response.data;
  },

  async updateTask(id: string, task: UpdateTaskInput): Promise<Task> {
    const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, task);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await axios.delete(`${API_URL}/tasks/${id}`);
  },
};
