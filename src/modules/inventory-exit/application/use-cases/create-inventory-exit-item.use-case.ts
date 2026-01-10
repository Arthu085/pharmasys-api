import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { IInventoryExitItemRepository } from '../../domain/repositories/inventory-exit-item.repository.interface';
import { FindOneItemUseCase } from 'src/modules/item/application/use-cases/find-one-item.use-case';
import { FindOneBatchUseCase } from 'src/modules/batch/application/use-cases/find-one-batch.use-case';
import { CreateStockBalanceUseCase } from 'src/modules/stock-balance/application/use-cases/create-stock-balance.use-case';
import { InventoryExitItemCreateDto } from '../dtos/inventory-exit-item-create.dto';
import { InventoryExitEntity } from '../../domain/entities/inventory-exit.entity';
import { InventoryExitItemQuantity } from '../../domain/value-objects/inventory-exit-item-quantity.vo';
import { StockBalanceOperationType } from 'src/modules/stock-balance/domain/enums/stock-balance-operation-type.enum';
import { ExitTypeEnum } from '../../domain/enums/exit-type.enum';

@Injectable()
export class CreateInventoryExitItemUseCase {
  constructor(
    @Inject(IInventoryExitItemRepository)
    private readonly inventoryExitItemRepository: IInventoryExitItemRepository,
    private readonly findOneItemUseCase: FindOneItemUseCase,
    private readonly findOneBatchUseCase: FindOneBatchUseCase,
    private readonly createStockBalanceUseCase: CreateStockBalanceUseCase,
  ) {}

  async execute(
    dto: InventoryExitItemCreateDto,
    inventoryExit: InventoryExitEntity,
    type: ExitTypeEnum,
    entityManager: EntityManager,
  ): Promise<void> {
    const binds = {
      inventoryExit: inventoryExit,
      item: await this.findOneItemUseCase.findEntityByUuid(dto.item),
      batch: await this.findOneBatchUseCase.findEntityByUuid(dto.batch),
      quantity: InventoryExitItemQuantity.create(dto.quantity),
    };

    await this.inventoryExitItemRepository.create(
      {
        inventoryExit: binds.inventoryExit,
        item: binds.item,
        batch: binds.batch,
        quantity: binds.quantity.getValue(),
      },
      entityManager,
    );

    await this.createStockBalanceUseCase.execute(
      {
        item: binds.item,
        batch: binds.batch,
        stockLocation: binds.inventoryExit.stockLocation,
        quantity: binds.quantity.getValue(),
        type: StockBalanceOperationType.SUBTRACT,
      },
      type,
      entityManager,
    );
  }
}
