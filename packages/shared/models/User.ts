import { Role } from './roles';

export interface CreateUser {
  name: string;
  password: string;
  email: string;
  role: Role;
}
export interface UserDto {
  id: number;
  name: string;
  email: string;
  role: Role;
}
export interface LoginDto {
  email: string;
  password: string;
}


export interface LoginResponseDto {
  token: string;
  user: UserDto;
}