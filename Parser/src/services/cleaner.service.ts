import fs from 'fs/promises';
import path from 'path';
import { Logger } from '../utils/logger';

export class CleanerService {
  async cleanup(files: string[]): Promise<void> {
    Logger.section('Очистка временных файлов');
    
    let deleted = 0;
    let failed = 0;

    for (const file of files) {
      try {
        await fs.unlink(file);
        Logger.success(`Удален: ${path.basename(file)}`);
        deleted++;
      } catch (e) {
        Logger.error(`Не удалось удалить: ${path.basename(file)}`);
        failed++;
      }
    }

    // Пробуем удалить пустую папку
    if (files.length > 0) {
      const dir = path.dirname(files[0]);
      try {
        const remaining = await fs.readdir(dir);
        if (remaining.length === 0) {
          await fs.rmdir(dir);
          Logger.info(`Удалена папка: ${dir}`);
        }
      } catch (e) {}
    }

    Logger.success(`Удалено файлов: ${deleted}${failed ? `, не удалось: ${failed}` : ''}`);
  }
}