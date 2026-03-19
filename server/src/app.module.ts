import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ImportCarsModule } from './import-cars/import-cars.module';


@Module({
  imports: [PrismaModule, ImportCarsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
