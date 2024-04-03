import { PrismaService } from '@/shared/services/prisma.service';
import { ITaskRepoService } from '../abstractions/task-repo.abstract';
import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';

@Injectable()
export class TaskRepoService implements ITaskRepoService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(task: any): Promise<any> {
    return await this.prisma.task.create({
      data: { ...task },
    });
  }
  async getTasks(): Promise<any[]> {
    return await this.prisma.task.findMany({
      include: {
        createdBy: {
          select: { id: true, email: true, name: true },
        },
      },
    });
  }
  updateTask(task: Task): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  async deleteTask(id: number): Promise<Task> {
    return await this.prisma.task.delete({
      where: { id },
    });
  }
}
