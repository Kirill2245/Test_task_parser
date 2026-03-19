export interface CarPrice {
  display: string;
  raw: number;
}

export interface CarMileage {
  display: string;
  raw: number;
}

export interface Car {

  id: string;
  make: string;
  model: string;
  year: number;
  

  totalPrice: CarPrice;
  basePrice: CarPrice;
  

  mileage: CarMileage;
  

  transmission?: string;
  engineSize?: string;
  inspection?: string;
  repairHistory?: boolean;
  warranty?: string;
  color?: string;
  colorCodes?: string;
  

  mainImage?: string;
  additionalImages: string[];
  

  shopName?: string;
  shopLocation?: string;
  

  detailUrl?: string;
  
  page: string;
  parsedAt: string;
}

export interface ParsedResult {
  totalCars: number;
  parsedAt: string;
  cars: Car[];
}

export interface Stats {
  total: number;
  byMake: Record<string, number>;
  byYear: Record<string, number>;
}

export interface DownloadResult {
  success: boolean;
  filePath: string;
  pageNumber: number;
  url: string;
  size?: number;
  error?: string;
}