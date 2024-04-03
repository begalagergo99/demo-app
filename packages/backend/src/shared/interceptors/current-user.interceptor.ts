import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { IRedisService } from '../abstractions/IRedisService';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly redisService: IRedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    const redisObject = await this.redisService.get(token);
    const user = JSON.parse(redisObject);
    request.body = {
      ...request.body,
      user: { email: user.email, id: user.id },
    };

    return await next.handle().pipe();
  }
}
