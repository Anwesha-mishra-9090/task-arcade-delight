
import React, { useState } from 'react';
import { Task } from '@/models/Task';
import { useTasks } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Trash2, Edit, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask, editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(task.title);
  };

  const handleSave = () => {
    if (editValue.trim()) {
      editTask(task.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(task.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-between p-3 rounded-lg mb-2 border transition-all duration-300",
        task.completed ? 'bg-secondary/80 border-primary/20' : 'bg-background border-border',
        task.completed && 'animate-task-complete'
      )}
    >
      <div className="flex items-center flex-1 gap-3">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full w-6 h-6 flex-shrink-0 transition-colors",
            task.completed && "bg-primary text-primary-foreground"
          )}
          onClick={() => toggleTaskCompletion(task.id)}
        >
          {task.completed && <Check className="h-3 w-3" />}
        </Button>

        {isEditing ? (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="flex-1 h-8"
            autoFocus
          />
        ) : (
          <span 
            className={cn(
              "flex-1 break-words transition-all duration-200",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex gap-1 ml-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              size="icon"
              className="w-7 h-7"
              onClick={handleSave}
            >
              <Check className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-7 h-7"
              onClick={handleCancel}
            >
              <X className="h-3 w-3" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              size="icon"
              className="w-7 h-7"
              onClick={handleEdit}
              disabled={task.completed}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-7 h-7 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => deleteTask(task.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
