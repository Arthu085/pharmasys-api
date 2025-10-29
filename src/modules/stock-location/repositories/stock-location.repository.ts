import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockLocationEntity } from '../entities/stock-location.entity';
import { DeepPartial, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { FilterStockLocationDto } from '../DTOs/filter.stock-location.dto';
import { StatusEnum } from 'src/shared/enums/status.enum';

@Injectable()
export class StockLocationRepository {
  constructor(
    @InjectRepository(StockLocationEntity)
    private readonly repo: Repository<StockLocationEntity>,
  ) {}

  findAll(
    filters: FilterStockLocationDto,
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

    return this.repo.findAndCount({ where, take, skip });
  }

  findById(id: number): Promise<StockLocationEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  findByCode(code: string): Promise<StockLocationEntity | null> {
    return this.repo.findOne({ where: { code } });
  }

  findByName(name: string): Promise<StockLocationEntity | null> {
    return this.repo.findOne({ where: { name } });
  }

  create(stockLocation: Partial<StockLocationEntity>): StockLocationEntity {
    return this.repo.create(stockLocation);
  }

  merge(
    stockLocation: StockLocationEntity,
    dto: DeepPartial<StockLocationEntity>,
  ): StockLocationEntity {
    return this.repo.merge(stockLocation, dto);
  }

  save(stockLocation: StockLocationEntity): Promise<StockLocationEntity> {
    return this.repo.save(stockLocation);
  }
}
