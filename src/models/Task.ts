
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}

export type TaskCreate = Omit<Task, 'id' | 'createdAt'>;
