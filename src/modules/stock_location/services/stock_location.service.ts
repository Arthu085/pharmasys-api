import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StockLocationRepository } from '../repositories/stock_location.repository';
import { toResponseStockLocationDto } from '../mappers/stock_location.mapper';
import { CreateStockLocationDto } from '../DTOs/create.stock_location.dto';

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

  async createStockLocation(dto: CreateStockLocationDto, userId: number) {
    const stockName = await this.stockLocationRepository.findByName(
      dto.name.toLowerCase(),
    );

    if (stockName) {
      throw new ConflictException(
        'Já existe um local de estoque com esse nome',
      );
    }

    const stockCode = await this.stockLocationRepository.findByCode(
      dto.code.toLowerCase(),
    );

    if (stockCode) {
      throw new ConflictException(
        'Já existe um local de estoque com esse código',
      );
    }

    const stock = this.stockLocationRepository.create({
      name: dto.name,
      code: dto.code,
      user_id: userId,
    });

    return this.stockLocationRepository.save(stock);
  }
}
