import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUserRepoService } from '../../user/abstracts/user-repo.abstract';

@Injectable()
export class UserRepoService implements IUserRepoService {
  constructor(private prismaService: PrismaService) {}
  async findUser(id: number): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
}
