import { UpdateResult, EntityManager } from 'typeorm';
import { UUID } from 'crypto';
import { StockBalanceEntity } from '../entities/stock-balance.entity';
import { StockBalanceFilterDto } from '../../application/dtos/stock-balance-filter.dto';
import { BatchEntity } from 'src/modules/batch/domain/entities/batch.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';
import { ItemEntity } from 'src/modules/item/domain/entities/item.entity';

export const IStockBalanceRepository = Symbol('IStockBalanceRepository');

export interface IStockBalanceRepository {
  findAll(
    filters: StockBalanceFilterDto,
    take: number,
    skip: number,
  ): Promise<[StockBalanceEntity[], number]>;

  findOne(uuid: UUID): Promise<StockBalanceEntity | null>;

  findByBatchAndStockLocationAndItem(
    batch: BatchEntity,
    stockLocation: StockLocationEntity,
    item: ItemEntity,
  ): Promise<StockBalanceEntity | null>;

  create(
    stockBalance: Partial<StockBalanceEntity>,
    entityManager: EntityManager,
  ): Promise<StockBalanceEntity>;

  update(
    uuid: UUID,
    data: Partial<StockBalanceEntity>,
    entityManager: EntityManager,
  ): Promise<UpdateResult>;
}
