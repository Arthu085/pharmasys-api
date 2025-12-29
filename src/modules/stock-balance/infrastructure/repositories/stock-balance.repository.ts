import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';

import { FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { IStockBalanceRepository } from '../../domain/repositories/stock-balance.repository.interface';
import { StockBalanceEntity } from '../../domain/entities/stock-balance.entity';

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
    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    if (filters.code) {
      where.code = ILike(`%${filters.code}%`);
    }

    if (filters.status) {
      where.status = filters.status;
    }

    return this.repo.findAndCount({
      where,
      take,
      skip,
      order: { id: 'DESC' },
      withDeleted: false,
    });
  }

  findOne(uuid: UUID): Promise<StockBalanceEntity | null> {
    return this.repo.findOne({
      where: { uuid },
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
