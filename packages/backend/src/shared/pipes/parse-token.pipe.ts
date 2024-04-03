import { Injectable, PipeTransform } from '@nestjs/common';
import { IRedisService } from '../abstractions/IRedisService';
import { UserSession } from '../models/user-session';

@Injectable()
export class ParseTokenPipe implements PipeTransform {
  // inject any dependency
  constructor(private readonly redisService: IRedisService) {}

  async transform(value: any): Promise<UserSession> {
    const user = await this.redisService.get(value);
    return JSON.parse(user);
  }
}
