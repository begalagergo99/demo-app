import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ExtractToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length);
      return token;
    } else {
      return null;
    }
  },
);
