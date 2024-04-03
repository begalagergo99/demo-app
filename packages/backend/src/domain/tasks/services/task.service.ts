import { CreateTaskDto } from '@demo-app/shared/models/Task';
import { ITaskService } from '../abstractions/tast-service.abstract';
import { ITaskRepoService } from '../abstractions/task-repo.abstract';
import { IUserRepoService } from '../../user/abstracts/user-repo.abstract';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTask } from '../models/Task';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    private taskRepoService: ITaskRepoService,
    private userRepoService: IUserRepoService,
  ) {}

  async createTask(task: CreateTaskDto, currentUserId: number) {
    try {
      let assignedUsers = [];
      if (task.assignedIds) {
        assignedUsers = await Promise.all(
          task.assignedIds.map((userId) => this.getUser(userId)),
        );
      }
      const createdBy = await this.getUser(currentUserId);
      const newTask: CreateTask = {
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        createdByUserId: createdBy.id,
      };
      return this.taskRepoService.createTask(newTask);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error creating task');
    }
  }
  async getTasks() {
    try {
      return await this.taskRepoService.getTasks();
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error fetching tasks');
    }
  }
  updateTask(task: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async deleteTask(id: number): Promise<boolean> {
    try {
      const deleted = await this.taskRepoService.deleteTask(id);
      return !!deleted;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error deleting task');
    }
  }

  private async getUser(id: number) {
    return await this.userRepoService.findUser(id);
  }
}
