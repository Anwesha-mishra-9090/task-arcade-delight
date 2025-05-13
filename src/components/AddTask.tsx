
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useTasks } from '@/contexts/TaskContext';

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const { addTask } = useTasks();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (taskTitle.trim()) {
      addTask({ 
        title: taskTitle.trim(), 
        completed: false 
      });
      setTaskTitle('');
    }
  };

  return (
    <form 
      onSubmit={handleAddTask} 
      className="flex gap-2 mb-6"
    >
      <Input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
      />
      <Button type="submit" disabled={!taskTitle.trim()}>
        <Plus className="h-4 w-4 mr-1" />
        Add
      </Button>
    </form>
  );
};

export default AddTask;
