import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarsDto } from './dto/create-cars.dto';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class ImportCarsService {
    public constructor (private readonly prismaService:PrismaService){}

    private async createCars(dto: CreateCarsDto) {
        const car = await this.prismaService.car.create({
            data: {
                make: dto.make,
                model: dto.model,
                year: dto.year,
                totalPriceDisplay: dto.totalPriceDisplay,
                totalPriceRaw: dto.totalPriceRaw,
                basePriceDisplay: dto.basePriceDisplay,
                basePriceRaw: dto.basePriceRaw,
                mileageDisplay: dto.mileageDisplay,
                mileageRaw: dto.mileageRaw,
                transmission: dto.transmission,
                engineSize: dto.engineSize,
                inspection: dto.inspection,
                repairHistory: dto.repairHistory,
                warranty: dto.warranty,
                color: dto.color,
                colorCodes: dto.colorCodes,
                mainImage: dto.mainImage,
                additionalImages: dto.additionalImages ? JSON.stringify(dto.additionalImages) : Prisma.JsonNull,
                shopName: dto.shopName,
                shopLocation: dto.shopLocation,
                detailUrl: dto.detailUrl,
                page: dto.page,
                parsedAt: dto.parsedAt,
                makeTranslated: dto.makeTranslated,
                colorTranslated: dto.colorTranslated,
                transmissionTranslated: dto.transmissionTranslated,
                inspectionTranslated: dto.inspectionTranslated,
                warrantyTranslated: dto.warrantyTranslated,
                repairHistoryTranslated: dto.repairHistoryTranslated,
                modelTranslated: dto.modelTranslated,
                shopNameTranslated: dto.shopNameTranslated,
                shopLocationTranslated: dto.shopLocationTranslated,
            },
        });
        return car;
    }

    public async importAllCars(list:CreateCarsDto[]){}
}
