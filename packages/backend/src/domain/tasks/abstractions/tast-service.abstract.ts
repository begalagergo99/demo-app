import { CreateTaskDto } from '@demo-app/shared/models/Task';

export abstract class ITaskService {
  abstract createTask(task: CreateTaskDto, currentUserId: number): Promise<any>;
  abstract getTasks(): Promise<any[]>;
  abstract updateTask(task: any): Promise<any>;
  abstract deleteTask(id: number): Promise<boolean>;
}
