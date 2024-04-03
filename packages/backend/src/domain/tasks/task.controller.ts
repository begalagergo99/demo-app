import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ITaskService } from './abstractions/tast-service.abstract';
import { CreateTaskDto } from '@demo-app/shared/models/Task';
import { ParseTokenPipe } from '@/shared/pipes/parse-token.pipe';
import { ExtractToken } from '@/shared/decorators/extract-token.decorator';
import { UserSession } from '@/shared/models/user-session';
import { AuthGuard } from '@/shared/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: ITaskService) {}

  @Post('create')
  async createTask(
    @Body() createTask: CreateTaskDto,
    @ExtractToken(ParseTokenPipe) user: UserSession,
  ) {
    return await this.taskService.createTask(createTask, user.id);
  }

  @Get('all')
  async getTasks() {
    return await this.taskService.getTasks();
  }

  @Delete('delete/:id')
  async deleteTask(@Param('id') id: number) {
    return await this.taskService.deleteTask(id);
  }
}
