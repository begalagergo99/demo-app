import { CreateUser, LoginDto } from '@demo-app/shared/models/user';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { IAuthService } from './abstractions';
import { ExtractToken } from '@/shared/decorators/extract-token.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return token;
  }

  @Post('signup')
  async signup(@Body() signupDto: CreateUser) {
    return await this.authService.signup(signupDto);
  }

  @Get('tokenValidation')
  async tokenValidation(@ExtractToken() token: string | null) {
    return await this.authService.tokenValidation(token);
  }
}
