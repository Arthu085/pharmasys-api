import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockLocation } from '../entities/stock-location.entity';
import { DeepPartial, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { FilterStockLocationDto } from '../DTOs/filter.stock-location.dto';

@Injectable()
export class StockLocationRepository {
  constructor(
    @InjectRepository(StockLocation)
    private readonly repo: Repository<StockLocation>,
  ) {}

  findAll(
    filters: FilterStockLocationDto,
    take: number,
    skip: number,
  ): Promise<[StockLocation[], number]> {
    const where: FindOptionsWhere<StockLocation> = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    if (filters.code) {
      where.code = ILike(`%${filters.code}%`);
    }

    if (filters.status) {
      where.status = filters.status;
    }

    return this.repo.findAndCount({ where, take, skip });
  }

  findById(id: number): Promise<StockLocation | null> {
    return this.repo.findOne({ where: { id } });
  }

  findByCode(code: string): Promise<StockLocation | null> {
    return this.repo.findOne({ where: { code } });
  }

  findByName(name: string): Promise<StockLocation | null> {
    return this.repo.findOne({ where: { name } });
  }

  create(stockLocation: Partial<StockLocation>): StockLocation {
    return this.repo.create(stockLocation);
  }

  merge(
    stockLocation: StockLocation,
    dto: DeepPartial<StockLocation>,
  ): StockLocation {
    return this.repo.merge(stockLocation, dto);
  }

  save(stockLocation: StockLocation): Promise<StockLocation> {
    return this.repo.save(stockLocation);
  }
}
