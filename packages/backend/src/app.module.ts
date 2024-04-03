import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AuthModule } from './authentication/auth.module';
import { TaskModule } from './domain/tasks/task.module';

dotenv.config(); // Load the environment variables
console.log(`The connection URL is ${process.env.DATABASE_URL}`);
@Module({
  imports: [AuthModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
