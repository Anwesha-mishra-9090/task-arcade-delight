
import { useTasks } from '@/contexts/TaskContext';
import { Badge } from '@/components/ui/badge';

const PointsDisplay = () => {
  const { points } = useTasks();
  
  return (
    <Badge className="bg-primary text-primary-foreground font-semibold">
      {points} Points
    </Badge>
  );
};

export default PointsDisplay;
