import { Body, Controller, Get, Post } from '@nestjs/common';
import { ImportCarsService } from './import-cars.service';
import { ImportCarDto } from './dto/import-car.dto';

@Controller('import-cars')
export class ImportCarsController {
  constructor(private readonly importCarsService: ImportCarsService) {}

  @Get('/test')
  public test(){
    return {succes:true}
  }

  @Post()
  public async importAllCars(@Body() dtos: ImportCarDto[]) {
    return this.importCarsService.importAllCars(dtos);
  }

  @Get('/all')
  public async findAllCars(){
    return this.importCarsService.findAllCars();
  }
}
