import { UpdateResult } from 'typeorm';
import { UUID } from 'crypto';
import { StockBalanceEntity } from '../entities/stock-balance.entity';
import { StockBalanceFilterDto } from '../../application/dtos/stock-balance-filter.dto';
import { BatchEntity } from 'src/modules/batch/domain/entities/batch.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';

export const IStockBalanceRepository = Symbol('IStockBalanceRepository');

export interface IStockBalanceRepository {
  findAll(
    filters: StockBalanceFilterDto,
    take: number,
    skip: number,
  ): Promise<[StockBalanceEntity[], number]>;

  findOne(uuid: UUID): Promise<StockBalanceEntity | null>;

  findByBatchAndStockLocation(
    batch: BatchEntity,
    stockLocation: StockLocationEntity,
  ): Promise<StockBalanceEntity | null>;

  create(
    stockBalance: Partial<StockBalanceEntity>,
  ): Promise<StockBalanceEntity>;

  update(uuid: UUID, data: Partial<StockBalanceEntity>): Promise<UpdateResult>;
}
