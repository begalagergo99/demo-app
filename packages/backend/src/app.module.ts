import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AuthModule } from './authentication/auth.module';

dotenv.config(); // Load the environment variables
console.log(`The connection URL is ${process.env.DATABASE_URL}`);
@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
