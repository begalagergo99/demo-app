import { CreateUser, LoginDto, LoginResponseDto } from '@demo-app/shared';

export abstract class IAuthService {
  abstract login(loginDto: LoginDto): Promise<LoginResponseDto>;
  abstract signup(signupDto: CreateUser): Promise<boolean>;
  abstract tokenValidation(token?: string): Promise<LoginResponseDto>;
}
