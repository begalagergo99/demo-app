import { CreateUser } from '@demo-app/shared';
import { User } from '@prisma/client';

export abstract class IAuthRepoService {
  abstract findUser(email: string): Promise<User | null>;
  abstract createUser(user: CreateUser): Promise<User>;
}
