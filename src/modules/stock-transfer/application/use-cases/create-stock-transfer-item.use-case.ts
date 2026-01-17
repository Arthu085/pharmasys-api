import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { FindOneItemUseCase } from 'src/modules/item/application/use-cases/find-one-item.use-case';
import { FindOneBatchUseCase } from 'src/modules/batch/application/use-cases/find-one-batch.use-case';
import { CreateStockBalanceUseCase } from 'src/modules/stock-balance/application/use-cases/create-stock-balance.use-case';
import { StockBalanceOperationType } from 'src/modules/stock-balance/domain/enums/stock-balance-operation-type.enum';
import { IStockTransferItemRepository } from '../../domain/repositories/stock-transfer-item.repository.interface';
import { StockTransferDomainService } from '../../domain/services/stock-transfer-domain.service';
import { StockTransferItemCreateDto } from '../dtos/stock-transfer-item-create.dto';
import { StockTransferEntity } from '../../domain/entities/stock-transfer.entity';
import { StockTransferItemQuantity } from '../../domain/value-objects/stock-transfer-item-quantity.vo';
import { FindOneStockBalanceUseCase } from 'src/modules/stock-balance/application/use-cases/find-one-stock-balance.use-case';

@Injectable()
export class CreateStockTransferItemUseCase {
  constructor(
    @Inject(IStockTransferItemRepository)
    private readonly stockTransferItemRepository: IStockTransferItemRepository,
    private readonly findOneItemUseCase: FindOneItemUseCase,
    private readonly findOneBatchUseCase: FindOneBatchUseCase,
    private readonly createStockBalanceUseCase: CreateStockBalanceUseCase,
  ) {}

  async execute(
    dto: StockTransferItemCreateDto,
    stockTransfer: StockTransferEntity,
    entityManager: EntityManager,
  ): Promise<void> {
    const binds = {
      stockTransfer: stockTransfer,
      item: await this.findOneItemUseCase.findEntityByUuid(dto.item),
      batch: await this.findOneBatchUseCase.findEntityByUuid(dto.batch),
      quantity: StockTransferItemQuantity.create(dto.quantity),
    };

    await this.stockTransferItemRepository.create(
      {
        stockTransfer: binds.stockTransfer,
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
        stockLocation: binds.stockTransfer.origin,
        quantity: binds.quantity.getValue(),
        type: StockBalanceOperationType.SUBTRACT,
      },
      null,
      entityManager,
    );

    await this.createStockBalanceUseCase.execute(
      {
        item: binds.item,
        batch: binds.batch,
        stockLocation: binds.stockTransfer.destination,
        quantity: binds.quantity.getValue(),
        type: StockBalanceOperationType.ADD,
      },
      null,
      entityManager,
    );
  }
}
