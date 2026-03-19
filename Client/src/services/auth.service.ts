
import axios from 'axios';
import type { LoginDto, RegisterDto, AuthResponse, User } from '../types/auth.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class AuthService {
  private static instance: AuthService;
  private api;

  private constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    this.api.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/auth/login', data);
      const { accessToken } = response.data;
      
      this.saveToken(accessToken);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Ошибка входа');
      }
      throw error;
    }
  }

  async register(data: RegisterDto): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/auth/register', data);
      const { accessToken } = response.data;
      
      this.saveToken(accessToken);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Ошибка регистрации');
      }
      throw error;
    }
  }

  async getProfile(): Promise<User> {
    try {
      const response = await this.api.get<User>('/auth/profile');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          this.removeToken();
        }
        throw new Error(error.response?.data?.message || 'Не удалось получить профиль');
      }
      throw error;
    }
  }

  saveToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  removeToken(): void {
    localStorage.removeItem('accessToken');
  }

  async checkAuth(): Promise<User | null> {
    const token = this.getToken();
    if (!token) return null;

    try {
      const user = await this.getProfile();
      return user;
    } catch {
      this.removeToken();
      return null;
    }
  }

  logout(): void {
    this.removeToken();
  }
}

export default AuthService.getInstance();