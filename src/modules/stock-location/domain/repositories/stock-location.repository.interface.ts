import { UpdateResult } from 'typeorm';
import { StockLocationEntity } from '../entities/stock-location.entity';
import { StockLocationFilterDto } from '../../application/dtos/stock-location-filter.dto';

export const IStockLocationRepository = Symbol('IStockLocationRepository');

export interface IStockLocationRepository {
  findAll(
    filters: StockLocationFilterDto,
    take: number,
    skip: number,
  ): Promise<[StockLocationEntity[], number]>;

  findOne(uuid: string): Promise<StockLocationEntity | null>;

  findByCode(code: string): Promise<StockLocationEntity | null>;

  create(
    stockLocation: Partial<StockLocationEntity>,
  ): Promise<StockLocationEntity>;

  update(stockLocation: StockLocationEntity): Promise<UpdateResult>;

  softDelete(uuid: string): Promise<UpdateResult>;
}
