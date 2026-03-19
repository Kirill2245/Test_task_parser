import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { Logger } from '../utils/logger';

export class ApiSenderService {
  private apiUrl: string;
  private translatedFilePath: string;
  private batchSize: number;

  constructor(batchSize: number = 50) { 
    this.apiUrl = process.env.API_URL || 'http://server:3001';
    this.translatedFilePath = path.join(process.cwd(), 'translated_data', 'cars_translated.json');
    this.batchSize = batchSize;
    
    Logger.info(`🌐 API URL: ${this.apiUrl}`);
    Logger.info(`📦 Размер порции: ${this.batchSize} автомобилей`);
  }

  async sendTranslatedToApi(): Promise<void> {
    try {
      Logger.section('ОТПРАВКА ДАННЫХ В API (ПОРЦИОННО)');
      
      try {
        await fs.access(this.translatedFilePath);
      } catch {
        Logger.error(`❌ Файл ${this.translatedFilePath} не найден`);
        return;
      }


      Logger.info(`📖 Чтение файла: ${this.translatedFilePath}`);
      const fileContent = await fs.readFile(this.translatedFilePath, 'utf-8');
      const data = JSON.parse(fileContent);

      if (!data.cars || data.cars.length === 0) {
        Logger.error('❌ Нет данных для отправки');
        return;
      }

      const totalCars = data.cars.length;
      Logger.info(`📊 Всего автомобилей: ${totalCars}`);

      const batches = [];
      for (let i = 0; i < totalCars; i += this.batchSize) {
        batches.push(data.cars.slice(i, i + this.batchSize));
      }

      Logger.info(`📦 Количество порций: ${batches.length}`);

      let successCount = 0;
      let errorCount = 0;

 
      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        
        Logger.info(`\n📤 Отправка порции ${i + 1}/${batches.length} (${batch.length} автомобилей)...`);

        try {
          const response = await axios.post(
            `${this.apiUrl}/import-cars`,
            batch,
            {
              headers: { 
                'Content-Type': 'application/json',
              },
              timeout: 60000 
            }
          );

          if (response.status === 200 || response.status === 201) {
            successCount += batch.length;
            Logger.success(`✅ Порция ${i + 1} отправлена успешно`);
            
            if (response.data) {
              Logger.info(`📦 Ответ: ${JSON.stringify(response.data)}`);
            }
          } else {
            errorCount += batch.length;
            Logger.error(`❌ Ошибка при отправке порции ${i + 1}: статус ${response.status}`);
          }

        } catch (error: any) {
          errorCount += batch.length;
          
          if (error.response?.status === 413) {
            Logger.warning(`⚠️ Порция ${i + 1} слишком большая, пробуем уменьшить...`);
            

            const subBatchSize = Math.floor(this.batchSize / 2);
            Logger.info(`📦 Новый размер порции: ${subBatchSize}`);
            
            for (let j = 0; j < batch.length; j += subBatchSize) {
              const subBatch = batch.slice(j, j + subBatchSize);
              
              try {
                await new Promise(resolve => setTimeout(resolve, 1000)); 
                
                const subResponse = await axios.post(
                  `${this.apiUrl}/import-cars`,
                  subBatch,
                  { headers: { 'Content-Type': 'application/json' } }
                );
                
                if (subResponse.status === 200 || subResponse.status === 201) {
                  successCount += subBatch.length;
                  Logger.success(`  ✅ Подпорция ${j/subBatchSize + 1} отправлена`);
                }
              } catch (subError: any) {
                Logger.error(`  ❌ Ошибка подпорции: ${subError.message}`);
              }
            }
          } else {
            Logger.error(`❌ Ошибка порции ${i + 1}: ${error.message}`);
          }
        }


        if (i < batches.length - 1) {
          Logger.info(`⏳ Ожидание 2 сек перед следующей порцией...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      Logger.section('РЕЗУЛЬТАТ ОТПРАВКИ');
      Logger.success(`✅ Успешно отправлено: ${successCount} автомобилей`);
      if (errorCount > 0) {
        Logger.error(`❌ Ошибок: ${errorCount} автомобилей`);
      }

    } catch (error: any) {
      if (error.code === 'ECONNREFUSED') {
        Logger.error(`❌ Сервер недоступен по адресу ${this.apiUrl}`);
      } else {
        Logger.error(`❌ Ошибка отправки: ${error.message}`);
      }
    }
  }
}