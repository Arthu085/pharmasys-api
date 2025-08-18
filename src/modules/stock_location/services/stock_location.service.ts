import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StockLocationRepository } from '../repositories/stock_location.repository';
import { toResponseStockLocationDto } from '../mappers/stock_location.mapper';
import { CreateStockLocationDto } from '../DTOs/create.stock_location.dto';
import { UpdateStockLocationDto } from '../DTOs/update.stock_location.dto';

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

  async findStockLocationByIdForValidates(id: number, conflictReturn: string) {
    const stock = await this.stockLocationRepository.findById(id);

    if (!stock) {
      throw new NotFoundException('Local de estoque não encontrado');
    }

    if (stock.is_central_stock === true) {
      throw new ConflictException(
        `Não é possível ${conflictReturn} o estoque central`,
      );
    }

    return stock;
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

  async deleteStockLocation(id: number) {
    const stock = await this.findStockLocationByIdForValidates(id, 'deletar');

    await this.stockLocationRepository.delete(id);

    return { message: `Local de estoque com ID ${id} deletado com sucesso` };
  }

  async updateStockLocation(id: number, dto: UpdateStockLocationDto) {
    const stock = await this.findStockLocationByIdForValidates(id, 'atualizar');

    // Verificar se o novo nome já existe em outro local de estoque
    if (dto.name && dto.name.toLowerCase() !== stock.name.toLowerCase()) {
      const existingStock = await this.stockLocationRepository.findByName(
        dto.name,
      );
      if (existingStock) {
        throw new ConflictException(
          'Este nome já está em uso por outro local de estoque',
        );
      }
    }

    // Verificar se o novo código já existe em outro local de estoque
    if (dto.code && dto.code.toLowerCase() !== stock.code.toLowerCase()) {
      const existingStock = await this.stockLocationRepository.findByCode(
        dto.code,
      );
      if (existingStock) {
        throw new ConflictException(
          'Este código já está em uso por outro local de estoque',
        );
      }
    }

    const updateStockLocation = await this.stockLocationRepository.save({
      ...stock,
      ...dto,
    });

    return toResponseStockLocationDto(updateStockLocation);
  }
}
