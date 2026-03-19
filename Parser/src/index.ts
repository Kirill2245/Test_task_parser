import { Logger } from './utils/logger';
import { DownloaderService } from './services/downloader.service';
import { ParserService } from './services/parser.service';
import { StorageService } from './services/storage.service';
import { CleanerService } from './services/cleaner.service';
import { TranslatorService } from './services/translator.service';
import { ApiSenderService } from './services/api-sender.service';

class CarParserApp {
  private downloader: DownloaderService;
  private parser: ParserService;
  private storage: StorageService;
  private cleaner: CleanerService;
  private translator: TranslatorService;
  private isRunning: boolean = false;
  private intervalId: NodeJS.Timeout | null = null;
  private apiSender: ApiSenderService; 

  constructor() {
    this.downloader = new DownloaderService();
    this.parser = new ParserService();
    this.storage = new StorageService();
    this.cleaner = new CleanerService();
    this.translator = new TranslatorService();
     this.apiSender = new ApiSenderService();
  }


  async runOnce() {

    if (this.isRunning) {
      Logger.success('⚠️ Предыдущий запуск ещё выполняется, пропускаем...');
      return;
    }

    this.isRunning = true;
    const startTime = Date.now();
    
    try {
      Logger.section(`ЗАПУСК: ${new Date().toLocaleString()}`);

      await this.downloader.initialize();
      await this.storage.initialize();


      Logger.section('ШАГ 1: Загрузка HTML страниц');
      const downloadedFiles = await this.downloader.downloadPages();

      if (downloadedFiles.length === 0) {
        Logger.error('Нет файлов для парсинга');
        return;
      }


      Logger.section('ШАГ 2: Парсинг HTML файлов');
      const allCars = [];
      
      for (const file of downloadedFiles) {
        const cars = await this.parser.parseFile(file);
        allCars.push(...cars);
      }


      Logger.section('ШАГ 3: Сохранение в JSON');
      await this.storage.saveAllCars(allCars);
      await this.storage.saveStats(allCars);


      Logger.section('ШАГ 4: Перевод данных');
      await this.translator.saveTranslated(allCars);


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
      Logger.section('ШАГ 5: Отправка в API ');
      await this.apiSender.sendTranslatedToApi();

      Logger.section('ШАГ 6: Очистка временных файлов');
      await this.cleaner.cleanup(downloadedFiles);

      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);
      
      Logger.section('ПРОЦЕСС ЗАВЕРШЕН');
      Logger.success(`✅ Успешно завершено за ${duration} сек`);
      Logger.info(`📁 Оригинал: ${this.storage['outputDir']}/all_cars.json`);
      Logger.info(`📁 Перевод: translated_data/cars_translated.json`);

    } catch (error) {
      Logger.error(`❌ Критическая ошибка: ${error}`);
      throw error;
    } finally {
      this.isRunning = false;
    }
  }


  start(intervalHours: number = 1) {
    const intervalMs = intervalHours * 60 * 60 * 1000;
    
    Logger.section(`ЗАПУСК ПЛАНИРОВЩИКА`);
    Logger.info(`⏰ Интервал: каждый ${intervalHours} час(а)`);
    Logger.info(`🕐 Первый запуск: сейчас`);


    this.runOnce().catch(console.error);


    this.intervalId = setInterval(() => {
      Logger.info(`\n🕐 Плановый запуск в ${new Date().toLocaleString()}`);
      this.runOnce().catch(console.error);
    }, intervalMs);


    process.on('SIGINT', () => this.stop());
    process.on('SIGTERM', () => this.stop());
  }


  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      Logger.success('\n⏹️ Планировщик остановлен');
    }
    

    if (this.isRunning) {
      Logger.success('⏳ Ожидание завершения текущего процесса...');

      const timeout = setTimeout(() => {
        Logger.error('❌ Принудительное завершение');
        process.exit(1);
      }, 30000);
      

      const checkInterval = setInterval(() => {
        if (!this.isRunning) {
          clearInterval(checkInterval);
          clearTimeout(timeout);
          process.exit(0);
        }
      }, 100);
    } else {
      process.exit(0);
    }
  }


  async run() {
    return this.runOnce();
  }
}


function startApp() {
  const app = new CarParserApp();
  

  const intervalHours = parseInt(process.env.PARSER_INTERVAL_HOURS || '1', 10);
  

  if (process.env.RUN_ONCE === 'true') {

    app.run().catch(console.error);
  } else {

    app.start(intervalHours);
  }
}


startApp();

export { CarParserApp };