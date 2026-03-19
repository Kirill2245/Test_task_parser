import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio';
import { Car, CarPrice, CarMileage } from '../types/car';
import { config } from '../config';
import { Logger } from '../utils/logger';
import { parseJapaneseNumber, extractYear } from '../utils/helpers';

// Определяем тип для Cheerio с любым элементом
type CheerioElement = cheerio.Cheerio<any>;

export class ParserService {
  async parseFile(filePath: string): Promise<Car[]> {
    Logger.info(`Парсинг: ${path.basename(filePath)}`);
    
    const html = await fs.readFile(filePath, 'utf-8');
    const $ = cheerio.load(html);
    
    const cars: Car[] = [];
    
    $(config.selectors.carCassette).each((index: number, element: any) => {
      try {
        const car = this.parseCarCard($(element), path.basename(filePath));
        if (car) cars.push(car);
      } catch (e) {
        Logger.error(`Ошибка парсинга карточки ${index}: ${e}`);
      }
    });
    
    Logger.success(`Найдено машин: ${cars.length}`);
    return cars;
  }

  private parseCarCard(card: cheerio.Cheerio<any>, pageName: string): Car | null {
    try {
      // ID машины
      const id = card.find(config.selectors.cassetteId)
        .attr('id')?.replace('_cas', '') || '';
      
      // Марка
      const make = card.find(config.selectors.make).first().text().trim();
      
      // Модель
      const model = card.find(config.selectors.model).text().trim();
      
      // Цены
      const totalPriceText = card.find(config.selectors.totalPrice).text().trim();
      const totalPriceUnit = card.find(config.selectors.totalPriceUnit).text().trim();
      
      const basePriceText = card.find(config.selectors.basePrice).text().trim();
      const basePriceUnit = card.find(config.selectors.basePriceUnit).text().trim();
      
      // Год
      const yearText = card.find(config.selectors.year).text().trim();
      
      // Пробег
      const mileageText = card.find(config.selectors.mileage).text().trim();
      
      // Характеристики
      const transmission = card.find(config.selectors.transmission).text().trim() || undefined;
      const engineSize = card.find(config.selectors.engineSize).text().trim() || undefined;
      const inspection = card.find(config.selectors.inspection).text().trim() || undefined;
      
      // История ремонта
      const repairText = card.find(config.selectors.repairHistory).text().trim();
      const repairHistory = repairText === 'なし' ? false : 
                           repairText === 'あり' ? true : undefined;
      
      // Гарантия
      const warranty = card.find(config.selectors.warranty).text().trim() || undefined;
      
      // Цвет
      const colorEl = card.find(config.selectors.color);
      const color = colorEl.clone().children().remove().end().text().trim() || undefined;
      
      // Коды цвета
      const colorCodes: string[] = [];
      card.find(config.selectors.colorTip).each((_, el) => {
        const classes = card.find(el).attr('class') || '';
        const match = classes.match(/btn_([A-Z]{2})/);
        if (match) colorCodes.push(match[1]);
      });
      
      // Магазин
      const shopName = card.find(config.selectors.shopName).text().trim() || undefined;
      
      const prefecture = card.find(config.selectors.shopPrefecture).text().trim();
      const city = card.find(config.selectors.shopCity).text().trim();
      const shopLocation = prefecture && city ? `${prefecture} ${city}` : undefined;
      
      // Фото
      const mainImageEl = card.find(config.selectors.mainImage);
      const mainImage = mainImageEl.attr('data-original') || 
                       mainImageEl.attr('src') || undefined;
      
      const additionalImages: string[] = [];
      card.find(config.selectors.additionalImages).each((_, img) => {
        const src = card.find(img).attr('data-original') || 
                    card.find(img).attr('src') || '';
        if (src && !src.includes('nophoto') && src !== mainImage) {
          additionalImages.push(src);
        }
      });
      
      // Ссылка на детальную страницу
      const linkEl = card.find(config.selectors.detailLink);
      let detailUrl = linkEl.attr('href') || undefined;
      if (detailUrl && !detailUrl.startsWith('http')) {
        detailUrl = `https://www.carsensor.net${detailUrl}`;
      }

      // Создаем объект машины
      return {
        id,
        make,
        model,
        year: extractYear(yearText),
        
        totalPrice: {
          display: totalPriceText + totalPriceUnit,
          raw: parseJapaneseNumber(totalPriceText + totalPriceUnit)
        },
        
        basePrice: {
          display: basePriceText + basePriceUnit,
          raw: parseJapaneseNumber(basePriceText + basePriceUnit)
        },
        
        mileage: {
          display: mileageText + '万km',
          raw: parseJapaneseNumber(mileageText + '万km')
        },
        
        transmission,
        engineSize,
        inspection,
        repairHistory,
        warranty,
        color,
        colorCodes: colorCodes.join(','),
        
        mainImage,
        additionalImages,
        
        shopName,
        shopLocation,
        
        detailUrl,
        
        page: pageName,
        parsedAt: new Date().toISOString()
      };
      
    } catch (e) {
      Logger.error(`Ошибка парсинга карточки: ${e}`);
      return null;
    }
  }
}