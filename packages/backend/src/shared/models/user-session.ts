import { Role } from './../../../../shared/models/roles';

export interface UserSession {
  id: number;
  name: string;
  email: string;
  role: Role;
}
