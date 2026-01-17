import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockTransferEntity } from './domain/entities/stock-transfer.entity';
import { StockTransferItemEntity } from './domain/entities/stock-transfer-item.entity';
import { IStockTransferRepository } from './domain/repositories/stock-transfer.repository.interface';
import { IStockTransferItemRepository } from './domain/repositories/stock-transfer-item.repository.interface';
import { StockTransferRepository } from './infrastructure/repositories/stock-transfer.repository';
import { StockTransferItemRepository } from './infrastructure/repositories/stock-transfer-item.repository';
import { StockTransferDomainService } from './domain/services/stock-transfer-domain.service';
import { CreateStockTransferUseCase } from './application/use-cases/create-stock-transfer.use-case';
import { CreateStockTransferItemUseCase } from './application/use-cases/create-stock-transfer-item.use-case';
import { FindOneStockTransferUseCase } from './application/use-cases/find-one-stock-transfer.use-case';
import { FindAllStockTransferUseCase } from './application/use-cases/find-all-stock-transfer.use-case';
import { StockTransferProtectedController } from './infrastructure/controllers/stock-transfer-protected.controller';
import { StockTransferPublicController } from './infrastructure/controllers/stock-transfer-public.controller';
import { UserModule } from '../user/user.module';
import { ItemModule } from '../item/item.module';
import { BatchModule } from '../batch/batch.module';
import { StockLocationModule } from '../stock-location/stock-location.module';
import { StockBalanceModule } from '../stock-balance/stock-balance.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockTransferEntity, StockTransferItemEntity]),
    UserModule,
    ItemModule,
    BatchModule,
    StockLocationModule,
    StockBalanceModule,
    SharedModule,
  ],
  controllers: [
    StockTransferProtectedController,
    StockTransferPublicController,
  ],
  providers: [
    {
      provide: IStockTransferRepository,
      useClass: StockTransferRepository,
    },
    {
      provide: IStockTransferItemRepository,
      useClass: StockTransferItemRepository,
    },
    StockTransferDomainService,
    CreateStockTransferUseCase,
    CreateStockTransferItemUseCase,
    FindOneStockTransferUseCase,
    FindAllStockTransferUseCase,
  ],
  exports: [FindOneStockTransferUseCase, CreateStockTransferUseCase],
})
export class StockTransferModule {}
