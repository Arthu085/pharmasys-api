import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { InventoryEntryItemCreateDto } from '../dtos/inventory-entry-item-create.dto';
import { IInventoryEntryItemRepository } from '../../domain/repositories/inventory-entry-item.repository.interface';
import { FindOneItemUseCase } from 'src/modules/item/application/use-cases/find-one-item.use-case';
import { FindOneBatchUseCase } from 'src/modules/batch/application/use-cases/find-one-batch.use-case';
import { InventoryEntryItemQuantity } from '../../domain/value-objects/inventory-entry-item-quantity.vo';
import { InventoryEntryItemUnitPrice } from '../../domain/value-objects/inventory-entry-item-unit-price.vo';
import { CreateStockBalanceUseCase } from 'src/modules/stock-balance/application/use-cases/create-stock-balance.use-case';
import { StockBalanceOperationType } from 'src/modules/stock-balance/domain/enums/stock-balance-operation-type.enum';
import { InventoryEntryEntity } from '../../domain/entities/inventory-entry.entity';

@Injectable()
export class CreateInventoryEntryItemUseCase {
  constructor(
    @Inject(IInventoryEntryItemRepository)
    private readonly inventoryEntryItemRepository: IInventoryEntryItemRepository,
    private readonly findOneItemUseCase: FindOneItemUseCase,
    private readonly findOneBatchUseCase: FindOneBatchUseCase,
    private readonly createStockBalanceUseCase: CreateStockBalanceUseCase,
  ) {}

  async execute(
    dto: InventoryEntryItemCreateDto,
    inventoryEntry: InventoryEntryEntity,
    entityManager: EntityManager,
  ): Promise<void> {
    const binds = {
      inventoryEntry: inventoryEntry,
      item: await this.findOneItemUseCase.findEntityByUuid(dto.item),
      batch: await this.findOneBatchUseCase.findEntityByUuid(dto.batch),
      quantity: InventoryEntryItemQuantity.create(dto.quantity),
      unitPrice: InventoryEntryItemUnitPrice.create(dto.unitPrice),
    };

    await this.inventoryEntryItemRepository.create(
      {
        inventoryEntry: binds.inventoryEntry,
        item: binds.item,
        batch: binds.batch,
        quantity: binds.quantity.getValue(),
        unitPrice: binds.unitPrice.getValue(),
      },
      entityManager,
    );

    await this.createStockBalanceUseCase.execute(
      {
        item: binds.item,
        batch: binds.batch,
        stockLocation: binds.inventoryEntry.stockLocation,
        quantity: binds.quantity.getValue(),
        type: StockBalanceOperationType.ADD,
      },
      null,
      entityManager,
    );
  }
}
