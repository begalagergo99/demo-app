import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IRedisService } from '../abstractions/IRedisService';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly excludeRoutes = 'authentication';

  constructor(private readonly redisService: IRedisService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.path;
    // Ellenőrzi, hogy az aktuális útvonal szerepel-e a kizártak listáján
    if (this.excludeRoutes.includes(path)) {
      return true; // Ha igen, engedélyezi a kérést
    }
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException();
    }

    return this.redisService.exists(token).then((isValidToken) => {
      if (!isValidToken) {
        throw new UnauthorizedException();
      } else {
        return true;
      }
    });
  }
}
