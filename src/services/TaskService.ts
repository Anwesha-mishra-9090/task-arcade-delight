
import { Task } from "../models/Task";

const STORAGE_KEY = 'todo-tasks';
const POINTS_KEY = 'todo-points';

export const TaskService = {
  getTasks: (): Task[] => {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  },

  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },

  getPoints: (): number => {
    const points = localStorage.getItem(POINTS_KEY);
    return points ? parseInt(points, 10) : 0;
  },

  savePoints: (points: number): void => {
    localStorage.setItem(POINTS_KEY, points.toString());
  },

  addPoints: (amount: number): number => {
    const currentPoints = TaskService.getPoints();
    const newPoints = currentPoints + amount;
    TaskService.savePoints(newPoints);
    return newPoints;
  }
};
