import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';

import { FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { IStockBalanceRepository } from '../../domain/repositories/stock-balance.repository.interface';
import { StockBalanceEntity } from '../../domain/entities/stock-balance.entity';
import { StockBalanceFilterDto } from '../../application/dtos/stock-balance-filter.dto';
import { BatchEntity } from 'src/modules/batch/domain/entities/batch.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';
import { ItemEntity } from 'src/modules/item/domain/entities/item.entity';

@Injectable()
export class StockBalanceRepository implements IStockBalanceRepository {
  constructor(
    @InjectRepository(StockBalanceEntity)
    private readonly repo: Repository<StockBalanceEntity>,
  ) {}

  findAll(
    filters: StockBalanceFilterDto,
    take: number,
    skip: number,
  ): Promise<[StockBalanceEntity[], number]> {
    const where: FindOptionsWhere<StockBalanceEntity> = {};
    if (filters.item) {
      where.item = { uuid: filters.item };
    }

    if (filters.batch) {
      where.batch = { uuid: filters.batch };
    }

    if (filters.stockLocation) {
      where.stockLocation = { uuid: filters.stockLocation };
    }

    return this.repo.findAndCount({
      where,
      relations: ['item', 'batch', 'stockLocation'],
      take,
      skip,
      order: { id: 'DESC' },
      withDeleted: false,
    });
  }

  findOne(uuid: UUID): Promise<StockBalanceEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: ['item', 'batch', 'stockLocation'],
      withDeleted: false,
    });
  }

  findByBatchAndStockLocationAndItem(
    batch: BatchEntity,
    stockLocation: StockLocationEntity,
    item: ItemEntity,
  ): Promise<StockBalanceEntity | null> {
    return this.repo.findOne({
      where: {
        batch: { uuid: batch.uuid },
        stockLocation: { uuid: stockLocation.uuid },
        item: { uuid: item.uuid },
      },
      withDeleted: false,
    });
  }

  create(
    stockBalance: Partial<StockBalanceEntity>,
  ): Promise<StockBalanceEntity> {
    const newStockBalance = this.repo.create(stockBalance);
    return this.repo.save(newStockBalance);
  }

  update(uuid: UUID, data: Partial<StockBalanceEntity>): Promise<UpdateResult> {
    return this.repo.update({ uuid }, data);
  }
}
