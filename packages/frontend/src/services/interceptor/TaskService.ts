import { CreateTaskDto, TaskDto } from '@demo-app/shared/models/Task';
import axiosInstance from './axios.interceptor';
export const TaskService  = {
  async createTask(task: CreateTaskDto): Promise<TaskDto> {
    return await axiosInstance.post('/task/create', task);
  },
  async getTasks(): Promise<TaskDto[]> {
    return (await axiosInstance.get('/task/all')).data;
  },
  // async updateTask(task: any): Promise<any> {
  //   return await TaskService.updateTask(task);
  // },
  async deleteTask(id: number): Promise<boolean> {
    return await TaskService.deleteTask(id);
  }
}