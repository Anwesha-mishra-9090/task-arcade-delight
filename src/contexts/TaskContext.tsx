
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskCreate } from '../models/Task';
import { TaskService } from '../services/TaskService';
import { useToast } from '@/hooks/use-toast';

interface TaskContextProps {
  tasks: Task[];
  points: number;
  addTask: (taskData: TaskCreate) => void;
  editTask: (id: string, title: string) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  completedCount: number;
  pendingCount: number;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [points, setPoints] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    const savedTasks = TaskService.getTasks();
    const savedPoints = TaskService.getPoints();
    setTasks(savedTasks);
    setPoints(savedPoints);
  }, []);

  useEffect(() => {
    TaskService.saveTasks(tasks);
  }, [tasks]);

  const addTask = (taskData: TaskCreate) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title,
      completed: false,
      createdAt: Date.now()
    };
    setTasks(prev => [newTask, ...prev]);
    toast({
      title: "Task added",
      description: `"${taskData.title}" has been added to your list.`
    });
  };

  const editTask = (id: string, title: string) => {
    setTasks(prev => 
      prev.map(task => task.id === id ? { ...task, title } : task)
    );
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully."
    });
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === id) {
          const completed = !task.completed;
          // If completing a task, add points
          if (completed && !task.completed) {
            const newPoints = TaskService.addPoints(10);
            setPoints(newPoints);
            toast({
              title: "Task completed! +10 points",
              description: `You now have ${newPoints} points.`
            });
          }
          return { 
            ...task, 
            completed, 
            completedAt: completed ? Date.now() : undefined 
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(prev => prev.filter(task => task.id !== id));
    
    if (taskToDelete) {
      toast({
        title: "Task deleted",
        description: `"${taskToDelete.title}" has been removed.`
      });
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        points, 
        addTask, 
        editTask, 
        toggleTaskCompletion, 
        deleteTask,
        completedCount,
        pendingCount
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
