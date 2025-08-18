import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockLocation } from '../entities/stock_location.entity';
import { Repository } from 'typeorm';
import { ResponseStockLocationDto } from '../DTOs/response.stock_location.dto';
import { toResponseStockLocationDto } from '../mappers/stock_location.mapper';

@Injectable()
export class StockLocationRepository {
  constructor(
    @InjectRepository(StockLocation)
    private readonly repo: Repository<StockLocation>,
  ) {}

  async findAll(): Promise<ResponseStockLocationDto[]> {
    const result = await this.repo.find();

    return result.map(toResponseStockLocationDto);
  }

  findById(id: number): Promise<StockLocation | null> {
    return this.repo.findOne({ where: { id } });
  }

  findByName(name: string): Promise<StockLocation | null> {
    return this.repo
      .createQueryBuilder('stock_location')
      .where('LOWER(stock_location.name) = LOWER(:name)', { name })
      .getOne();
  }

  findByCode(code: string): Promise<StockLocation | null> {
    return this.repo
      .createQueryBuilder('stock_location')
      .where('LOWER(stock_location.code) = LOWER(:code)', { code })
      .getOne();
  }

  create(item: Partial<StockLocation>): StockLocation {
    return this.repo.create(item);
  }

  save(item: StockLocation): Promise<StockLocation> {
    return this.repo.save(item);
  }

  delete(id: number): Promise<void> {
    return this.repo.delete(id).then(() => {});
  }
}
