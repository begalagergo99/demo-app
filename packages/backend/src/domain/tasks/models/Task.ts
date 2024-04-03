import { Status } from '@demo-app/shared/models/Task';
import { User } from '@prisma/client';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: Date;
  assigned: User[];
  createdBy: User;
}

export interface CreateTask {
  title: string;
  description: string;
  status: Status;
  dueDate: Date;
  assignedIds?: number[];
  createdByUserId: number;
}
