import { UpdateResult } from 'typeorm';
import { UUID } from 'crypto';

import { StockLocationEntity } from '../entities/stock-location.entity';
import { StockLocationFilterDto } from '../../application/dtos/stock-location-filter.dto';

export const IStockLocationRepository = Symbol('IStockLocationRepository');

export interface IStockLocationRepository {
  findAll(
    filters: StockLocationFilterDto,
    take: number,
    skip: number,
  ): Promise<[StockLocationEntity[], number]>;

  findOne(uuid: UUID): Promise<StockLocationEntity | null>;

  findByCode(code: string): Promise<StockLocationEntity | null>;

  create(
    stockLocation: Partial<StockLocationEntity>,
  ): Promise<StockLocationEntity>;

  update(uuid: UUID, data: Partial<StockLocationEntity>): Promise<UpdateResult>;

  softDelete(uuid: UUID): Promise<UpdateResult>;
}
