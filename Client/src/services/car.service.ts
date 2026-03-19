// services/car.service.ts
import axios from 'axios';
import type { Car } from '../types/car.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class CarService {
  private static instance: CarService;

  private constructor() {}

  static getInstance(): CarService {
    if (!CarService.instance) {
      CarService.instance = new CarService();
    }
    return CarService.instance;
  }

  async getAllCars(): Promise<Car[]> {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/import-cars/all`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке автомобилей:', error);
      throw error;
    }
  }

  async getCarsWithFilters(params?: {
    page?: number;
    limit?: number;
    make?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    try {
      const response = await axios.get(`${API_URL}/import-cars`, { params });
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке автомобилей:', error);
      throw error;
    }
  }

  async getCarById(id: string): Promise<Car> {
    try {
      const response = await axios.get(`${API_URL}/import-cars/${id}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке автомобиля:', error);
      throw error;
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ¥';
  }

  formatMileage(mileage: number): string {
    return new Intl.NumberFormat('ru-RU').format(mileage) + ' км';
  }
}

export default CarService.getInstance();