import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';

import { StockLocationEntity } from '../../domain/entities/stock-location.entity';
import { FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { StockLocationFilterDto } from '../../application/dtos/stock-location-filter.dto';
import { IStockLocationRepository } from '../../domain/repositories/stock-location.repository.interface';

@Injectable()
export class StockLocationRepository implements IStockLocationRepository {
  constructor(
    @InjectRepository(StockLocationEntity)
    private readonly repo: Repository<StockLocationEntity>,
  ) {}

  findAll(
    filters: StockLocationFilterDto,
    take: number,
    skip: number,
  ): Promise<[StockLocationEntity[], number]> {
    const where: FindOptionsWhere<StockLocationEntity> = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    if (filters.code) {
      where.code = ILike(`%${filters.code}%`);
    }

    if (filters.status) {
      const status = StatusEnum[filters.status];
      where.status = status;
    }

    return this.repo.findAndCount({
      where,
      take,
      skip,
      order: { id: 'DESC' },
      withDeleted: false,
    });
  }

  findOne(uuid: UUID): Promise<StockLocationEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: ['userCreated', 'userUpdated'],
      withDeleted: false,
    });
  }

  findByCode(code: string): Promise<StockLocationEntity | null> {
    return this.repo.findOne({
      where: { code },
      withDeleted: false,
    });
  }

  create(
    stockLocation: Partial<StockLocationEntity>,
  ): Promise<StockLocationEntity> {
    const newStockLocation = this.repo.create(stockLocation);
    return this.repo.save(newStockLocation);
  }

  update(stockLocation: StockLocationEntity): Promise<UpdateResult> {
    return this.repo.update({ uuid: stockLocation.uuid }, stockLocation);
  }

  softDelete(uuid: UUID): Promise<UpdateResult> {
    return this.repo.softDelete({ uuid });
  }
}
