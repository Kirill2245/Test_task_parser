import { Logger } from './utils/logger';
import { DownloaderService } from './services/downloader.service';
import { ParserService } from './services/parser.service';
import { StorageService } from './services/storage.service';
import { CleanerService } from './services/cleaner.service';
import { TranslatorService } from './services/translator.service';

class CarParserApp {
  private downloader: DownloaderService;
  private parser: ParserService;
  private storage: StorageService;
  private cleaner: CleanerService;
  private translator: TranslatorService;

  constructor() {
    this.downloader = new DownloaderService();
    this.parser = new ParserService();
    this.storage = new StorageService();
    this.cleaner = new CleanerService();
    this.translator = new TranslatorService();
  }

  async run() {
    try {
      Logger.section('ЗАПУСК: Загрузка → Парсинг → Очистка → Перевод');
      
      // Инициализация
      await this.downloader.initialize();
      await this.storage.initialize();

      // ШАГ 1: Загрузка
      Logger.section('ШАГ 1: Загрузка HTML страниц');
      const downloadedFiles = await this.downloader.downloadPages();

      if (downloadedFiles.length === 0) {
        Logger.error('Нет файлов для парсинга');
        return;
      }

      // ШАГ 2: Парсинг
      Logger.section('ШАГ 2: Парсинг HTML файлов');
      const allCars = [];
      
      for (const file of downloadedFiles) {
        const cars = await this.parser.parseFile(file);
        allCars.push(...cars);
      }

      // ШАГ 3: Сохранение результатов
      Logger.section('ШАГ 3: Сохранение данных');
      await this.storage.saveAllCars(allCars);
      await this.storage.saveStats(allCars);

      // ШАГ 4: Перевод данных
      Logger.section('ШАГ 4: Перевод данных');
      await this.translator.saveTranslated(allCars);

      // Показываем статистику
      Logger.section('ИТОГИ');
      Logger.info(`Обработано страниц: ${downloadedFiles.length}`);
      Logger.success(`Всего машин: ${allCars.length}`);

      if (allCars.length > 0) {
        Logger.info('\nПример первых 3 машин:');
        allCars.slice(0, 3).forEach((car, i) => {
          console.log(`\n--- Машина ${i + 1} ---`);
          console.log(`Марка: ${car.make}`);
          console.log(`Модель: ${car.model}`);
          console.log(`Год: ${car.year}`);
          console.log(`Цена: ${car.totalPrice.display}`);
          console.log(`Пробег: ${car.mileage.display}`);
        });
      }

      // ШАГ 5: Очистка
      Logger.section('ШАГ 5: Очистка временных файлов');
      await this.cleaner.cleanup(downloadedFiles);

      Logger.section('ПРОЦЕСС ЗАВЕРШЕН');
      Logger.info(`Результаты:`);
      Logger.info(`  📁 Оригинал: ${this.storage['outputDir']}/all_cars.json`);
      Logger.info(`  📁 Перевод: translated_data/cars_translated.json`);
      
    } catch (error) {
      Logger.error(`Критическая ошибка: ${error}`);
      throw error;
    }
  }
}

// Запуск приложения
const app = new CarParserApp();
app.run().catch(console.error);