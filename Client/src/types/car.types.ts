// types/car.types.ts
export interface Car {
  id: string;
  year: number;
  totalPriceDisplay: string;
  totalPriceRaw: number;
  basePriceDisplay: string | null;
  basePriceRaw: number | null;
  mileageDisplay: string | null;
  mileageRaw: number | null;
  transmission: string | null;
  engineSize: string | null;
  repairHistory: boolean | null;
  color: string | null;
  colorCodes: string | null;
  mainImage: string | null;
  additionalImages: string[];
  detailUrl: string | null;
  page: string | null;
  parsedAt: string;
  makeTranslated: string | null;
  colorTranslated: string | null;
  transmissionTranslated: string | null;
  inspectionTranslated: string | null;
  warrantyTranslated: string | null;
  repairHistoryTranslated: string | null;
  modelTranslated: string | null;
  shopNameTranslated: string | null;
  shopLocationTranslated: string | null;
}

export interface CarsResponse {
  data: Car[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}