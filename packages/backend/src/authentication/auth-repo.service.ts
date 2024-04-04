import { PrismaService } from './../shared/services/prisma.service';
import { CreateUser } from '@demo-app/shared';
import { Injectable } from '@nestjs/common';
import { IAuthRepoService } from './abstractions/auth-repo.abstract';

@Injectable()
export class AuthRepoService implements IAuthRepoService {
  constructor(private prisma: PrismaService) {}

  // Your repository methods here
  async findUser(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(user: CreateUser) {
    return await this.prisma.user.create({
      data: { ...user },
    });
  }
}
