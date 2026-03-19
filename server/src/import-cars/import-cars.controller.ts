import { Controller, Get } from '@nestjs/common';
import { ImportCarsService } from './import-cars.service';

@Controller('import-cars')
export class ImportCarsController {
  constructor(private readonly importCarsService: ImportCarsService) {}

  @Get('/test')
  public test(){
    return {succes:true}
  }
}
