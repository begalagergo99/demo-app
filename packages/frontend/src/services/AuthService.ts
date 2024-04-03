import { BASE_URL } from '.';
import { CreateUser, LoginDto } from '../../../shared/models/user';
import axios from 'axios';
import axiosInstance from './interceptor/axios.interceptor';

export const AuthService = {
  login: async (loginDto: LoginDto) => {
    return (await axios.post(`${BASE_URL}/auth/login`, loginDto)).data
  },
  signup: async (signupDto: CreateUser) => {
    return (await axios.post(`${BASE_URL}/auth/signup`, signupDto)).data
  },
  tokenValidation: async () => {
    return (await axiosInstance.get(`/auth/tokenValidation`)).data
  },
}