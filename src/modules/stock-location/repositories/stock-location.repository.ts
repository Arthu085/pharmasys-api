import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockLocation } from '../entities/stock-location.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class StockLocationRepository {
  constructor(
    @InjectRepository(StockLocation)
    private readonly repo: Repository<StockLocation>,
  ) {}

  findAll(): Promise<StockLocation[]> {
    return this.repo.find();
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
