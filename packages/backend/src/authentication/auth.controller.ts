import { CreateUser, LoginDto } from '@demo-app/shared/models/user';
import { Controller, Post, Body, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  AUTH_COOKIE_NAME,
  BEARER_TOKEN_PREFIX,
} from '@/shared/constants/utils.constants';
import { IAuthService } from './abstractions';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(loginDto);
    res.cookie(AUTH_COOKIE_NAME, `${BEARER_TOKEN_PREFIX}${token}`, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return !!token;
  }

  @Post('signup')
  async signup(@Body() signupDto: CreateUser) {
    return await this.authService.signup(signupDto);
  }

  @Get('tokenValidation')
  async tokenValidation(@Req() req: Request) {
    this.authService.tokenValidation(req.cookies[AUTH_COOKIE_NAME]);
    return true;
  }
}
