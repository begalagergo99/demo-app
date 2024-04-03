import React from 'react';
import { format } from 'date-fns';
import { TaskDto } from '@demo-app/shared/models/Task';
interface TaskRowProps {
  task: TaskDto
}

const TaskRow: React.FC<TaskRowProps> = ({task }: TaskRowProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4 mx-48 hover:bg-gray-50">
      <div className="flex items-center gap-10">
        <p className="mr-2">{task.status}</p>
        <p className="text-lg font-medium">{task.title}</p>
      </div>
      <div className="flex items-center gap-10">
        <p className="mr-2">{task.description}</p>
        <p>{format(task.dueDate,'yyyy-MM-dd')}</p>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default TaskRow;
