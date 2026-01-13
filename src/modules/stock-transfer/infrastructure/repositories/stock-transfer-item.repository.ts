import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { IStockTransferItemRepository } from '../../domain/repositories/stock-transfer-item.repository.interface';
import { StockTransferItemEntity } from '../../domain/entities/stock-transfer-item.entity';

@Injectable()
export class StockTransferItemRepository
  implements IStockTransferItemRepository
{
  constructor(
    @InjectRepository(StockTransferItemEntity)
    private readonly repo: Repository<StockTransferItemEntity>,
  ) {}

  create(
    stockTransferItem: Partial<StockTransferItemEntity>,
    entityManager: EntityManager,
  ): Promise<StockTransferItemEntity> {
    const manager = entityManager.getRepository(StockTransferItemEntity);
    const newStockTransferItem = manager.create(stockTransferItem);
    return manager.save(newStockTransferItem);
  }
}
