import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ExtractToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Ellenőrizze, hogy az Authorization fejléc létezik-e és "Bearer " szöveggel kezdődik-e
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length); // Kivágja a "Bearer " részt
      return token;
    } else {
      return null; // Vagy dobjon hibát, ha szigorúbb ellenőrzést szeretne
    }
  },
);
