import fs from 'fs/promises';
import path from 'path';
import { Car, ParsedResult, Stats } from '../types/car';
import { config } from '../config';
import { Logger } from '../utils/logger';

export class StorageService {
  private outputDir: string;

  constructor() {
    this.outputDir = config.directories.output;
  }

  async initialize(): Promise<void> {
    await fs.mkdir(this.outputDir, { recursive: true });
    Logger.info(`Директория результатов: ${this.outputDir}`);
  }

  async saveAllCars(cars: Car[]): Promise<string> {
    const result: ParsedResult = {
      totalCars: cars.length,
      parsedAt: new Date().toISOString(),
      cars
    };

    const filePath = path.join(this.outputDir, 'all_cars.json');
    await fs.writeFile(filePath, JSON.stringify(result, null, 2), 'utf-8');
    
    Logger.success(`Все данные сохранены: ${filePath}`);
    return filePath;
  }

  async saveStats(cars: Car[]): Promise<string> {
    const stats: Stats = {
      total: cars.length,
      byMake: this.countByField(cars, 'make'),
      byYear: this.countByField(cars, 'year')
    };

    const filePath = path.join(this.outputDir, 'stats.json');
    await fs.writeFile(filePath, JSON.stringify(stats, null, 2), 'utf-8');
    
    Logger.success(`Статистика сохранена: ${filePath}`);
    return filePath;
  }

  private countByField(cars: Car[], field: keyof Car): Record<string, number> {
    return cars.reduce((acc, car) => {
      const value = String(car[field]);
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}