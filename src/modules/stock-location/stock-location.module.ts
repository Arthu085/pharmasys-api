import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockLocationEntity } from './domain/entities/stock-location.entity';
import { StockLocationProtectedController } from './infrastructure/controllers/stock-location-protected.controller';
import { StockLocationPublicController } from './infrastructure/controllers/stock-location-public.controller';
import { StockLocationRepository } from './infrastructure/repositories/stock-location.repository';
import { StockLocationDomainService } from './domain/services/stock-location-domain.service';
import { CreateStockLocationUseCase } from './application/use-cases/create-stock-location.use-case';
import { UpdateStockLocationUseCase } from './application/use-cases/update-stock-location.use-case';
import { FindOneStockLocationUseCase } from './application/use-cases/find-one-stock-location.use-case';
import { FindAllStockLocationUseCase } from './application/use-cases/find-all-stock-location.use-case';
import { DeleteStockLocationUseCase } from './application/use-cases/delete-stock-location.use-case';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockLocationEntity]), UserModule],
  controllers: [
    StockLocationProtectedController,
    StockLocationPublicController,
  ],
  providers: [
    StockLocationRepository,
    StockLocationDomainService,
    CreateStockLocationUseCase,
    UpdateStockLocationUseCase,
    FindOneStockLocationUseCase,
    FindAllStockLocationUseCase,
    DeleteStockLocationUseCase,
  ],
  exports: [
    FindOneStockLocationUseCase,
    FindAllStockLocationUseCase,
    StockLocationDomainService,
  ],
})
export class StockLocationModule {}
