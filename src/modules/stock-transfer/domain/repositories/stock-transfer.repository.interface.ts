import { UUID } from 'crypto';
import { EntityManager } from 'typeorm';

import { StockTransferEntity } from '../entities/stock-transfer.entity';
import { StockTransferFilterDto } from '../../application/dtos/stock-transfer-filter.dto';

export const IStockTransferRepository = Symbol('IStockTransferRepository');

export interface IStockTransferRepository {
  findAll(
    filters: StockTransferFilterDto,
    take: number,
    skip: number,
  ): Promise<[StockTransferEntity[], number]>;

  findOne(uuid: UUID): Promise<StockTransferEntity | null>;

  create(
    stockTransfer: Partial<StockTransferEntity>,
    entityManager: EntityManager,
  ): Promise<StockTransferEntity>;
}
