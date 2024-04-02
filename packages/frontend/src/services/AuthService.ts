import { BASE_URL } from '.';
import { CreateUser, LoginDto } from '../../../shared/models/user';
import axios from 'axios';

export const AuthService = {
  login: async (loginDto: LoginDto) => {
    return (await axios.post(`${BASE_URL}/auth/login`, loginDto))
  },
  signup: async (signupDto: CreateUser) => {
    return (await axios.post(`${BASE_URL}/auth/signup`, signupDto)).data
  },
  tokenValidation: async () => {
    return await axios.get(`${BASE_URL}/auth/tokenValidation`)
  },
}