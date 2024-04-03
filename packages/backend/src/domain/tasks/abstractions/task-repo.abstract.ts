import { CreateTaskDto } from '@demo-app/shared/models/Task';
import { Task } from '@prisma/client';

export abstract class ITaskRepoService {
  abstract createTask(task: CreateTaskDto): Promise<Task>;
  abstract getTasks(): Promise<Task[]>;
  abstract updateTask(task: Task): Promise<Task>;
  abstract deleteTask(id: number): Promise<Task>;
}
