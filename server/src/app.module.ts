import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ImportCarsModule } from './import-cars/import-cars.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [PrismaModule, ImportCarsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
