import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryExitEntity } from './domain/entities/inventory-exit.entity';
import { InventoryExitItemEntity } from './domain/entities/inventory-exit-item.entity';
import { ExitItemTypeEntity } from './domain/entities/exit-item-type.entity';
import { IInventoryExitRepository } from './domain/repositories/inventory-exit.repository.interface';
import { IInventoryExitItemRepository } from './domain/repositories/inventory-exit-item.repository.interface';
import { IExitItemTypeRepository } from './domain/repositories/exit-item-type.repository.interface';
import { InventoryExitRepository } from './infrastructure/repositories/inventory-exit.repository';
import { InventoryExitItemRepository } from './infrastructure/repositories/inventory-exit-item.repository';
import { ExitItemTypeRepository } from './infrastructure/repositories/exit-item-type.repository';
import { InventoryExitDomainService } from './domain/services/inventory-exit-domain.service';
import { CreateInventoryExitUseCase } from './application/use-cases/create-inventory-exit.use-case';
import { CreateInventoryExitItemUseCase } from './application/use-cases/create-inventory-exit-item.use-case';
import { FindOneInventoryExitUseCase } from './application/use-cases/find-one-inventory-exit.use-case';
import { FindAllInventoryExitUseCase } from './application/use-cases/find-all-inventory-exit.use-case';
import { FindOneExitItemTypeUseCase } from './application/use-cases/find-one-entry-exit-type.use-case';
import { InventoryExitProtectedController } from './infrastructure/controllers/inventory-exit-protected.controller';
import { InventoryExitPublicController } from './infrastructure/controllers/inventory-exit-public.controller';
import { UserModule } from '../user/user.module';
import { ItemModule } from '../item/item.module';
import { BatchModule } from '../batch/batch.module';
import { StockLocationModule } from '../stock-location/stock-location.module';
import { StockBalanceModule } from '../stock-balance/stock-balance.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InventoryExitEntity,
      InventoryExitItemEntity,
      ExitItemTypeEntity,
    ]),
    UserModule,
    ItemModule,
    BatchModule,
    StockLocationModule,
    StockBalanceModule,
    SharedModule,
  ],
  controllers: [
    InventoryExitProtectedController,
    InventoryExitPublicController,
  ],
  providers: [
    {
      provide: IInventoryExitRepository,
      useClass: InventoryExitRepository,
    },
    {
      provide: IInventoryExitItemRepository,
      useClass: InventoryExitItemRepository,
    },
    {
      provide: IExitItemTypeRepository,
      useClass: ExitItemTypeRepository,
    },
    InventoryExitDomainService,
    CreateInventoryExitUseCase,
    CreateInventoryExitItemUseCase,
    FindOneInventoryExitUseCase,
    FindAllInventoryExitUseCase,
    FindOneExitItemTypeUseCase,
  ],
  exports: [FindOneInventoryExitUseCase],
})
export class InventoryExitModule {}
