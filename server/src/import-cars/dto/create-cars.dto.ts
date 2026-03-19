
import {
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsDateString,
  IsArray,
  ValidateNested,
  IsJSON,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarsDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsInt()
  year: number;

  @IsString()
  totalPriceDisplay: string;

  @IsInt()
  totalPriceRaw: number;

  @IsOptional()
  @IsString()
  basePriceDisplay?: string;

  @IsOptional()
  @IsInt()
  basePriceRaw?: number;

  @IsOptional()
  @IsString()
  mileageDisplay?: string;

  @IsOptional()
  @IsInt()
  mileageRaw?: number;

  @IsOptional()
  @IsString()
  transmission?: string;

  @IsOptional()
  @IsString()
  engineSize?: string;

  @IsOptional()
  @IsString()
  inspection?: string;

  @IsOptional()
  @IsBoolean()
  repairHistory?: boolean;

  @IsOptional()
  @IsString()
  warranty?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  colorCodes?: string;

  @IsOptional()
  @IsString()
  mainImage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  additionalImages?: string[];

  @IsOptional()
  @IsString()
  shopName?: string;

  @IsOptional()
  @IsString()
  shopLocation?: string;

  @IsOptional()
  @IsUrl()
  detailUrl?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsDateString()
  parsedAt: Date;

  // Поля для переведенных значений
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