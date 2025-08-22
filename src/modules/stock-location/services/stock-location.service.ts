import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { StockLocationRepository } from '../repositories/stock-location.repository';
import { ResponseStockLocationDto } from '../DTOs/response.stock-location.dto';
import { toResponseStockLocationDto } from '../mappers/stock-location.mapper';
import { CreateStockLocationDto } from '../DTOs/create.stock-location.dto';
import { UserRepository } from 'src/modules/user/repositories/user.repository';

@Injectable()
export class StockLocationService {
  private readonly logger = new Logger(StockLocationService.name);

  constructor(
    private readonly stockLocationRepository: StockLocationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAllStockLocations(): Promise<ResponseStockLocationDto[]> {
    const stockLocations = await this.stockLocationRepository.findAll();

    return stockLocations.map((stock) => toResponseStockLocationDto(stock));
  }

  async findByIdStockLocation(
    id: number,
  ): Promise<ResponseStockLocationDto | null> {
    const stockLocation = await this.stockLocationRepository.findById(id);

    if (!stockLocation) {
      throw new NotFoundException('Localização de estoque não encontrada');
    }

    return toResponseStockLocationDto(stockLocation);
  }

  async findByCodeStockLocation(
    code: string,
  ): Promise<ResponseStockLocationDto | null> {
    const stockLocation = await this.stockLocationRepository.findByCode(code);

    if (!stockLocation) {
      throw new NotFoundException('Localização de estoque não encontrada');
    }

    return toResponseStockLocationDto(stockLocation);
  }

  async findByNameStockLocation(
    name: string,
  ): Promise<ResponseStockLocationDto | null> {
    const stockLocation = await this.stockLocationRepository.findByName(name);

    if (!stockLocation) {
      throw new NotFoundException('Localização de estoque não encontrada');
    }

    return toResponseStockLocationDto(stockLocation);
  }

  async createStockLocation(
    dto: CreateStockLocationDto,
    userId: number,
  ): Promise<ResponseStockLocationDto> {
    const existingStockLocationCode = await this.findByCodeStockLocation(
      dto.code,
    );
    const existingStockLocationName = await this.findByNameStockLocation(
      dto.name,
    );

    if (existingStockLocationCode || existingStockLocationName) {
      throw new ConflictException(
        'Já existe uma localização de estoque com este código ou nome',
      );
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      const newStockLocation = this.stockLocationRepository.create({
        ...dto,
        userCreated: user,
      });

      const result = await this.stockLocationRepository.save(newStockLocation);

      return toResponseStockLocationDto(result);
    } catch (error) {
      this.logger.error(
        `Falha ao cadastrar local de estoque. Error: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao cadastrar o local de estoque',
      );
    }
  }
}
