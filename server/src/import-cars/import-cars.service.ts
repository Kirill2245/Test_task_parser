// src/import-cars/import-cars.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImportCarDto } from './dto/import-car.dto';
import { Prisma } from 'generated/prisma/client';

type ImportResult = {
  success: boolean;
  data?: any;
  error?: string;
  element?: ImportCarDto;
};

type ImportAllCarsResponse = {
  total: number;
  successful: number;
  failed: number;
  results: ImportResult[];
  message?: string;
};

@Injectable()
export class ImportCarsService {
  constructor(private readonly prismaService: PrismaService) {}

    public async importAllCars(dtos: ImportCarDto[]) {
        const results = {
        total: dtos.length,
        successful: 0,
        failed: 0,
        errors: [] as { detailUrl: string; error: string }[],
        message: ''
        };

        for (const dto of dtos) {
        try {
            // Преобразуем DTO в формат для Prisma
            const data: Prisma.CarCreateInput = {
            make: dto.make,
            model: dto.model,
            year: dto.year,
            totalPriceDisplay: dto.totalPrice.display,
            totalPriceRaw: dto.totalPrice.raw,
            basePriceDisplay: dto.basePrice?.display,
            basePriceRaw: dto.basePrice?.raw,
            mileageDisplay: dto.mileage?.display,
            mileageRaw: dto.mileage?.raw,
            transmission: dto.transmission,
            engineSize: dto.engineSize,
            inspection: dto.inspection,
            repairHistory: dto.repairHistory,
            warranty: dto.warranty,
            color: dto.color,
            colorCodes: dto.colorCodes,
            mainImage: dto.mainImage,
            additionalImages: dto.additionalImages?.length 
                ? dto.additionalImages as Prisma.InputJsonValue
                : Prisma.JsonNull,
            shopName: dto.shopName,
            shopLocation: dto.shopLocation,
            detailUrl: dto.detailUrl,
            page: dto.page,
            parsedAt: new Date(dto.parsedAt),
            makeTranslated: dto.makeTranslated,
            colorTranslated: dto.colorTranslated,
            transmissionTranslated: dto.transmissionTranslated,
            inspectionTranslated: dto.inspectionTranslated,
            warrantyTranslated: dto.warrantyTranslated,
            repairHistoryTranslated: dto.repairHistoryTranslated,
            modelTranslated: dto.modelTranslated,
            shopNameTranslated: dto.shopNameTranslated,
            shopLocationTranslated: dto.shopLocationTranslated,
            };

            // Используем upsert для создания или обновления по detailUrl
            await this.prismaService.car.upsert({
            where: { detailUrl: dto.detailUrl },
            update: data,
            create: data,
            });

            results.successful++;
        } catch (error) {
            results.failed++;
            results.errors.push({
            detailUrl: dto.detailUrl,
            error: error.message
            });
        }
        }

        results.message = `Импортировано ${results.successful} из ${results.total} автомобилей`;
        
        return results;
    }

    public async findAllCars(){
      return await this.prismaService.car.findMany({
         omit: {
          make: true,
          model: true,
          warranty: true,
          inspection: true,
          shopName: true,
          shopLocation: true,
        }
      })
    }
}