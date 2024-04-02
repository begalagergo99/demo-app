import { IRedisService } from '../shared/abstractions/IRedisService';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { nanoid } from 'nanoid';
import * as bcrypt from 'bcrypt';
import { IAuthRepoService, IAuthService } from './abstractions/index';
import {
  CreateUser,
  LoginDto,
  LoginResponseDto,
} from '@demo-app/shared/models/user';
import { Role } from '@demo-app/shared/models/roles';
import { UserSession } from '../shared/models/user-session';

@Injectable()
export class AuthService implements IAuthService {
  private readonly saltRounds = 10;
  constructor(
    private readonly authRepoService: IAuthRepoService,
    private readonly redisService: IRedisService,
  ) {}
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      const user = await this.authRepoService.findUser(loginDto.email);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Wrong email or password');
      }

      const userSession: UserSession = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as Role,
      };

      const authToken = await nanoid();
      try {
        await this.redisService.set(authToken, JSON.stringify(userSession));
      } catch (error) {
        console.log(error);
      }
      return { token: authToken, user: userSession };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Wrong email or password');
    }
  }
  async signup(signupDto: CreateUser): Promise<boolean> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      const password = await bcrypt.hash(signupDto.password, salt);
      const newUser = { ...signupDto, password };
      const createdUser = await this.authRepoService.createUser(newUser);
      return !!createdUser;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error creating user');
    }
  }
  async tokenValidation(token?: string): Promise<LoginResponseDto> {
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }
    const userSession = await this.redisService.get(token);
    if (!userSession) {
      throw new UnauthorizedException('Invalid token');
    }
    return { token, user: JSON.parse(userSession) };
  }
}
