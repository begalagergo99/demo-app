import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { ITaskService } from './abstractions/tast-service.abstract';
import { TaskService } from './services/task.service';
import { ITaskRepoService } from './abstractions/task-repo.abstract';
import { TaskRepoService } from './services/task-repo.service';
import { IUserRepoService } from '../user/abstracts/user-repo.abstract';
import { UserRepoService } from '../user/services/user-repo.service';
import { PrismaService } from '@/shared/services/prisma.service';
import { IRedisService } from '@/shared/abstractions/IRedisService';
import { RedisService } from '@/shared/services/redis.service';
import { ParseTokenPipe } from '@/shared/pipes/parse-token.pipe';
import { UserModule } from '../user/user.module';
import { AuthGuard } from '@/shared/guards/auth.guard';

@Module({
  imports: [UserModule],
  controllers: [TaskController],
  providers: [
    {
      provide: ITaskService,
      useClass: TaskService,
    },
    {
      provide: ITaskRepoService,
      useClass: TaskRepoService,
    },
    {
      provide: IRedisService,
      useClass: RedisService,
    },
    {
      provide: IUserRepoService,
      useClass: UserRepoService,
    },
    ParseTokenPipe,
    PrismaService,
  ],
})
export class TaskModule {}
