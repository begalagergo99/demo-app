import { atom } from 'recoil';
import { UserDto } from '../../../shared/models/user';

export const userState = atom<UserDto | null>({
  key: 'userState',
  default: null,
});