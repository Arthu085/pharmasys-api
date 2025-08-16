import { Injectable, NotFoundException } from '@nestjs/common';
import { StockLocationRepository } from '../repositories/stock_location.repository';
import { toResponseStockLocationDto } from '../mappers/stock_location.mapper';

@Injectable()
export class StockLocationService {
  constructor(
    private readonly stockLocationRepository: StockLocationRepository,
  ) {}

  async findAllStockLocations() {
    const stocks = await this.stockLocationRepository.findAll();

    if (stocks.length === 0) {
      throw new NotFoundException('Nenhum local de estoque encontrado');
    }

    return stocks;
  }

  async findStockLocationById(id: number) {
    const stock = await this.stockLocationRepository.findById(id);

    if (!stock) {
      throw new NotFoundException('Local de estoque não encontrado');
    }

    return toResponseStockLocationDto(stock);
  }
}
