import { IRedisService } from './../shared/abstractions/IRedisService';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepoService } from './auth-repo.service';
import { IAuthRepoService, IAuthService } from './abstractions/';
import { RedisService } from '@/shared/services/redis.service';
import { PrismaService } from '@/shared/services/prisma.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthService,
    },
    {
      provide: IAuthRepoService,
      useClass: AuthRepoService,
    },
    {
      provide: IRedisService,
      useClass: RedisService,
    },
    PrismaService,
  ],
})
export class AuthModule {}
