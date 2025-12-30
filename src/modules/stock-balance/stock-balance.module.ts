import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockBalanceEntity } from './domain/entities/stock-balance.entity';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';
import { StockBalancePublicController } from './infrastructure/controllers/stock-balance-public.controller';
import { StockBalanceProtectedController } from './infrastructure/controllers/stock-balance-protected.controller';
import { IStockBalanceRepository } from './domain/repositories/stock-balance.repository.interface';
import { StockBalanceRepository } from './infrastructure/repositories/stock-balance.repository';
import { StockBalanceDomainService } from './domain/services/stock-balance-domain.service';
import { FindAllStockBalanceUseCase } from './application/use-cases/find-all-stock-balance.use-case';
import { FindOneStockBalanceUseCase } from './application/use-cases/find-one-stock-balance.use-case';
import { CreateStockBalanceUseCase } from './application/use-cases/create-stock-location.use-case';
import { UpdateStockBalanceUseCase } from './application/use-cases/update-stock-balance.use-case';
import { StockLocationModule } from '../stock-location/stock-location.module';
import { ItemModule } from '../item/item.module';
import { BatchModule } from '../batch/batch.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockBalanceEntity]),
    StockLocationModule,
    ItemModule,
    BatchModule,
    SharedModule,
  ],
  controllers: [StockBalancePublicController, StockBalanceProtectedController],
  providers: [
    {
      provide: IStockBalanceRepository,
      useClass: StockBalanceRepository,
    },
    StockBalanceDomainService,
    FindAllStockBalanceUseCase,
    FindOneStockBalanceUseCase,
    CreateStockBalanceUseCase,
    UpdateStockBalanceUseCase,
  ],
  exports: [
    FindAllStockBalanceUseCase,
    FindOneStockBalanceUseCase,
    StockBalanceDomainService,
    CreateStockBalanceUseCase,
    UpdateStockBalanceUseCase,
  ],
})
export class StockBalanceModule {}
