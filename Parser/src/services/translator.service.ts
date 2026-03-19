import { Car } from '../types/car';
import { Logger } from '../utils/logger';
import * as fs from 'fs/promises';
import path from 'path';

interface Dictionary {
  brands: Record<string, string>;
  models: Record<string, string>;
  features: Record<string, string>;
  prefectures: Record<string, string>;
  shops: Record<string, string>;
  colors: Record<string, string>;
}

export class TranslatorService {
  private dictionary!: Dictionary;
  
  async loadDictionary(): Promise<void> {
    try {
      const dictPath = path.join(process.cwd(), 'dictionaries', 'car-terms.json');
      const data = await fs.readFile(dictPath, 'utf-8');
      this.dictionary = JSON.parse(data);
      Logger.success(`Словарь загружен: ${Object.keys(this.dictionary).length} категорий`);
    } catch (error) {
      Logger.error(`Не удалось загрузить словарь: ${error}`);
      throw error;
    }
  }
  
  translateText(text: string, category: keyof Dictionary): string {
    if (!text) return text;
    
    // Пробуем найти точное совпадение
    if (this.dictionary[category][text]) {
      return this.dictionary[category][text];
    }
    
    // Пробуем найти частичное совпадение
    for (const [key, value] of Object.entries(this.dictionary[category])) {
      if (text.includes(key)) {
        return text.replace(new RegExp(key, 'g'), value);
      }
    }
    
    return text;
  }
  
  translateModel(model: string): string {
    let translated = model;
    
    // Сортируем ключи по длине (сначала длинные)
    const sortedFeatures = Object.keys(this.dictionary.features).sort((a, b) => b.length - a.length);
    
    // Переводим все известные термины
    for (const term of sortedFeatures) {
      const regex = new RegExp(term, 'g');
      if (regex.test(translated)) {
        translated = translated.replace(regex, this.dictionary.features[term]);
      }
    }
    
    // Переводим модель
    for (const [modelKey, modelValue] of Object.entries(this.dictionary.models)) {
      if (translated.includes(modelKey)) {
        translated = translated.replace(modelKey, modelValue);
      }
    }
    
    return translated;
  }
  
  async translateCar(car: Car): Promise<any> {
    await this.loadDictionary();
    
    return {
      ...car,
      makeTranslated: this.translateText(car.make, 'brands'),
      colorTranslated: this.translateText(car.color || '', 'colors'),
      transmissionTranslated: this.translateText(car.transmission || '', 'features'),
      inspectionTranslated: car.inspection?.includes('年') 
        ? car.inspection.replace(/\(R\d+\)/, '') 
        : this.translateText(car.inspection || '', 'features'),
      warrantyTranslated: this.translateText(car.warranty || '', 'features'),
      repairHistoryTranslated: car.repairHistory === true ? 'Был ремонт' : 
                               car.repairHistory === false ? 'Без ремонта' : 'Не указано',
      modelTranslated: this.translateModel(car.model),
      shopNameTranslated: this.translateText(car.shopName || '', 'shops'),
      shopLocationTranslated: car.shopLocation?.split(' ').map(part => 
        this.translateText(part, 'prefectures') || part
      ).join(' ')
    };
  }
  
  async translateAllCars(cars: Car[]): Promise<any[]> {
    const translated = [];
    for (let i = 0; i < cars.length; i++) {
      Logger.info(`Перевод машины ${i + 1}/${cars.length}...`);
      translated.push(await this.translateCar(cars[i]));
    }
    return translated;
  }
  
  async saveTranslated(cars: Car[], outputDir: string = 'translated_data'): Promise<string> {
    const dir = path.join(process.cwd(), outputDir);
    await fs.mkdir(dir, { recursive: true });
    
    const translated = await this.translateAllCars(cars);
    
    const outputPath = path.join(dir, 'cars_translated.json');
    await fs.writeFile(outputPath, JSON.stringify({
      totalCars: cars.length,
      translatedAt: new Date().toISOString(),
      cars: translated
    }, null, 2), 'utf-8');
    
    Logger.success(`Переведенные данные сохранены: ${outputPath}`);
    return outputPath;
  }
}