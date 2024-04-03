import { Module } from '@nestjs/common';
import { UserRepoService } from './services/user-repo.service';
import { PrismaService } from '@/shared/services/prisma.service';
import { IUserRepoService } from './abstracts/user-repo.abstract';

@Module({
  providers: [UserRepoService, PrismaService],
  exports: [UserRepoService],
})
export class UserModule {}
