// src/import-cars/dto/import-car.dto.ts
import {
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsDateString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PriceDto {
  @IsString()
  display: string;

  @IsInt()
  raw: number;
}

class MileageDto {
  @IsString()
  display: string;

  @IsInt()
  raw: number;
}

export class ImportCarDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsInt()
  year: number;

  @ValidateNested()
  @Type(() => PriceDto)
  totalPrice: PriceDto;

  @ValidateNested()
  @Type(() => PriceDto)
  basePrice: PriceDto;

  @ValidateNested()
  @Type(() => MileageDto)
  mileage: MileageDto;

  @IsString()
  transmission: string;

  @IsString()
  engineSize: string;

  @IsString()
  inspection: string;

  @IsBoolean()
  repairHistory: boolean;

  @IsString()
  warranty: string;

  @IsString()
  color: string;

  @IsString()
  colorCodes: string;

  @IsUrl({ require_tld: false })
  mainImage: string;

  @IsArray()
  @IsString({ each: true })
  additionalImages: string[];

  @IsString()
  shopName: string;

  @IsString()
  shopLocation: string;

  @IsUrl()
  detailUrl: string;

  @IsString()
  page: string;

  @IsDateString()
  parsedAt: string;

  @IsOptional()
  @IsString()
  makeTranslated?: string;

  @IsOptional()
  @IsString()
  colorTranslated?: string;

  @IsOptional()
  @IsString()
  transmissionTranslated?: string;

  @IsOptional()
  @IsString()
  inspectionTranslated?: string;

  @IsOptional()
  @IsString()
  warrantyTranslated?: string;

  @IsOptional()
  @IsString()
  repairHistoryTranslated?: string;

  @IsOptional()
  @IsString()
  modelTranslated?: string;

  @IsOptional()
  @IsString()
  shopNameTranslated?: string;

  @IsOptional()
  @IsString()
  shopLocationTranslated?: string;
}