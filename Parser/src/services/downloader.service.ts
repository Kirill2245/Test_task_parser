import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { config } from '../config';
import { Logger } from '../utils/logger';
import { sleep } from '../utils/helpers';
import { DownloadResult } from '../types/car';

export class DownloaderService {
  private downloadDir: string;

  constructor() {
    this.downloadDir = config.directories.download;
  }

  async initialize(): Promise<void> {
    await fs.mkdir(this.downloadDir, { recursive: true });
    Logger.info(`Директория загрузки: ${this.downloadDir}`);
  }

  async downloadPages(startPage: number = 1, endPage: number = config.parsing.maxPages): Promise<string[]> {
    const browser = await puppeteer.launch({
      headless: config.puppeteer.headless,
      args: config.puppeteer.args
    });
    
    const page = await browser.newPage();
    const downloadedFiles: string[] = [];

    try {
      for (let i = startPage; i <= endPage; i++) {
        const result = await this.downloadSinglePage(page, i);
        
        if (result.success && result.filePath) {
          downloadedFiles.push(result.filePath);
          Logger.success(`Страница ${i}: ${result.size} символов`);
        } else if (result.error) {
          Logger.warning(`Страница ${i}: ${result.error}`);
        }

        if (i < endPage) {
          Logger.info(`Ожидание ${config.puppeteer.delayBetweenPages / 1000} сек...`);
          await sleep(config.puppeteer.delayBetweenPages);
        }
      }
    } finally {
      await browser.close();
    }

    Logger.success(`Загружено файлов: ${downloadedFiles.length}`);
    return downloadedFiles;
  }

  private async downloadSinglePage(page: any, pageNumber: number): Promise<DownloadResult> {
    const url = config.urls.getPageUrl(pageNumber);
    Logger.info(`Страница ${pageNumber}: ${url}`);

    try {
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: config.puppeteer.timeout
      });

      Logger.info('Ожидание загрузки контента...');
      await sleep(config.puppeteer.waitAfterLoad);

      const html = await page.content();
      const filePath = path.join(this.downloadDir, `page_${pageNumber}.html`);
      
      await fs.writeFile(filePath, html, 'utf-8');

      return {
        success: true,
        filePath,
        pageNumber,
        url,
        size: html.length
      };

    } catch (error) {
      Logger.error(`Ошибка загрузки: ${error}`);
      
      try {
        const html = await page.content();
        if (html && html.length > config.parsing.minHtmlSize) {
          const filePath = path.join(this.downloadDir, `page_${pageNumber}_partial.html`);
          await fs.writeFile(filePath, html, 'utf-8');
          
          return {
            success: true,
            filePath,
            pageNumber,
            url,
            size: html.length,
            error: 'Частичная загрузка'
          };
        }
      } catch (e) {}

      return {
        success: false,
        pageNumber,
        url,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
}