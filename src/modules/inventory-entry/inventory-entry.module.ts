import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryEntryEntity } from './domain/entities/inventory-entry.entity';
import { InventoryEntryItemEntity } from './domain/entities/inventory-entry-item.entity';
import { EntryItemTypeEntity } from './domain/entities/entry-item-type.entity';
import { IInventoryEntryRepository } from './domain/repositories/inventory-entry.repository.interface';
import { IInventoryEntryItemRepository } from './domain/repositories/inventory-entry-item.repository.interface';
import { IEntryItemTypeRepository } from './domain/repositories/entry-item-type.repository.interface';
import { InventoryEntryRepository } from './infrastructure/repositories/inventory-entry.repository';
import { InventoryEntryItemRepository } from './infrastructure/repositories/inventory-entry-item.repository';
import { EntryItemTypeRepository } from './infrastructure/repositories/entry-item-type.repository';
import { InventoryEntryDomainService } from './domain/services/inventory-entry-domain.service';
import { CreateInventoryEntryUseCase } from './application/use-cases/create-inventory-entry.use-case';
import { CreateInventoryEntryItemUseCase } from './application/use-cases/create-inventory-entry-item.use-case';
import { FindOneInventoryEntryUseCase } from './application/use-cases/find-one-inventory-entry.use-case';
import { FindAllInventoryEntryUseCase } from './application/use-cases/find-all-inventory-entry.use-case';
import { FindOneEntryItemTypeUseCase } from './application/use-cases/find-one-entry-item-type.use-case';
import { InventoryEntryProtectedController } from './infrastructure/controllers/inventory-entry-protected.controller';
import { InventoryEntryPublicController } from './infrastructure/controllers/inventory-entry-public.controller';
import { UserModule } from '../user/user.module';
import { ItemModule } from '../item/item.module';
import { BatchModule } from '../batch/batch.module';
import { StockLocationModule } from '../stock-location/stock-location.module';
import { StockBalanceModule } from '../stock-balance/stock-balance.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InventoryEntryEntity,
      InventoryEntryItemEntity,
      EntryItemTypeEntity,
    ]),
    UserModule,
    ItemModule,
    BatchModule,
    StockLocationModule,
    StockBalanceModule,
    SharedModule,
  ],
  controllers: [
    InventoryEntryProtectedController,
    InventoryEntryPublicController,
  ],
  providers: [
    {
      provide: IInventoryEntryRepository,
      useClass: InventoryEntryRepository,
    },
    {
      provide: IInventoryEntryItemRepository,
      useClass: InventoryEntryItemRepository,
    },
    {
      provide: IEntryItemTypeRepository,
      useClass: EntryItemTypeRepository,
    },
    InventoryEntryDomainService,
    CreateInventoryEntryUseCase,
    CreateInventoryEntryItemUseCase,
    FindOneInventoryEntryUseCase,
    FindAllInventoryEntryUseCase,
    FindOneEntryItemTypeUseCase,
  ],
  exports: [FindOneInventoryEntryUseCase],
})
export class InventoryEntryModule {}
