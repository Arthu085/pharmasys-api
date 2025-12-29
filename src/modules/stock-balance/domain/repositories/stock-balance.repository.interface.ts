import { UpdateResult } from 'typeorm';
import { UUID } from 'crypto';
import { StockBalanceEntity } from '../entities/stock-balance.entity';

export const IStockBalanceRepository = Symbol('IStockBalanceRepository');

export interface IStockBalanceRepository {
  findAll(
    filters: StockBalanceFilterDto,
    take: number,
    skip: number,
  ): Promise<[StockBalanceEntity[], number]>;

  findOne(uuid: UUID): Promise<StockBalanceEntity | null>;

  create(
    stockBalance: Partial<StockBalanceEntity>,
  ): Promise<StockBalanceEntity>;

  update(uuid: UUID, data: Partial<StockBalanceEntity>): Promise<UpdateResult>;
}
