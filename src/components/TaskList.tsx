
import { useTasks } from '@/contexts/TaskContext';
import TaskItem from './TaskItem';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TaskList = () => {
  const { tasks, completedCount, pendingCount } = useTasks();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="mt-2">
      <Tabs defaultValue="all" className="mb-4" onValueChange={(value) => setFilter(value as any)}>
        <div className="flex items-center justify-between mb-2">
          <TabsList className="grid grid-cols-3 w-[300px]">
            <TabsTrigger value="all">
              All ({tasks.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({pendingCount})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedCount})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="animate-fade">
          {tasks.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No tasks yet. Add one to get started!</p>
          ) : filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </TabsContent>
        
        <TabsContent value="active" className="animate-fade">
          {pendingCount === 0 ? (
            <p className="text-center text-muted-foreground py-8">No active tasks. You're all caught up!</p>
          ) : filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </TabsContent>
        
        <TabsContent value="completed" className="animate-fade">
          {completedCount === 0 ? (
            <p className="text-center text-muted-foreground py-8">No completed tasks yet.</p>
          ) : filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskList;
