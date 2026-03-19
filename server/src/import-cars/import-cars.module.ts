import { Module } from '@nestjs/common';
import { ImportCarsService } from './import-cars.service';
import { ImportCarsController } from './import-cars.controller';


@Module({

  controllers: [ImportCarsController],
  providers: [ImportCarsService],
})
export class ImportCarsModule {}
