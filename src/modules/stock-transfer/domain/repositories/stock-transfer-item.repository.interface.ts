import { EntityManager } from 'typeorm';

import { StockTransferItemEntity } from '../entities/stock-transfer-item.entity';

export const IStockTransferItemRepository = Symbol(
  'StockTransferItemRepository',
);

export interface IStockTransferItemRepository {
  create(
    stockTransferItem: Partial<StockTransferItemEntity>,
    entityManager: EntityManager,
  ): Promise<StockTransferItemEntity>;
}
