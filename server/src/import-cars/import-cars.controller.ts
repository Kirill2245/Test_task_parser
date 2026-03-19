import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ImportCarsService } from './import-cars.service';
import { ImportCarDto } from './dto/import-car.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('import-cars')
@UseGuards(JwtAuthGuard) 
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
