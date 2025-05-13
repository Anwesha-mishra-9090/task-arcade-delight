
import AddTask from './AddTask';
import TaskList from './TaskList';
import ThemeToggle from './ThemeToggle';
import PointsDisplay from './PointsDisplay';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

const TodoApp = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // prevents hydration errors with theme
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background transition-colors duration-300">
      <Card className="max-w-md mx-auto p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary-foreground/70 bg-clip-text text-transparent">
            Task Arcade
          </h1>
          <div className="flex items-center gap-3">
            <PointsDisplay />
            <ThemeToggle />
          </div>
        </div>
        
        <AddTask />
        <TaskList />
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>Complete tasks to earn points!</p>
        </footer>
      </Card>
    </div>
  );
};

export default TodoApp;
