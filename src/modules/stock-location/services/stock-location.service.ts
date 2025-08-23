import {
  BadRequestException,
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
import { UpdateStockLocationDto } from '../DTOs/update.stock-location.dto';
import { ChangeStatusDto } from 'src/shared/change-status.dto';

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

  async createStockLocation(
    dto: CreateStockLocationDto,
    userId: number,
  ): Promise<ResponseStockLocationDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const existingStockLocationCode =
      await this.stockLocationRepository.findByCode(dto.code);
    const existingStockLocationName =
      await this.stockLocationRepository.findByName(dto.name);

    if (existingStockLocationCode || existingStockLocationName) {
      throw new ConflictException(
        'Já existe uma localização de estoque com este código ou nome',
      );
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

  async updateStockLocation(
    id: number,
    dto: UpdateStockLocationDto,
    userId: number,
  ): Promise<ResponseStockLocationDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const stockLocation = await this.stockLocationRepository.findById(id);

    if (!stockLocation) {
      throw new NotFoundException('Localização de estoque não encontrada');
    }
    if (stockLocation.isCentralStock === true) {
      throw new BadRequestException(
        'Não é possível atualizar o local de estoque central',
      );
    }

    if (dto.name === stockLocation?.name || dto.code === stockLocation?.code) {
      throw new ConflictException(
        'Já existe uma localização de estoque com este código ou nome',
      );
    }

    const updatedEntity = this.stockLocationRepository.merge(stockLocation, {
      ...dto,
      userUpdated: user,
    });

    try {
      const result = await this.stockLocationRepository.save(updatedEntity);

      return toResponseStockLocationDto(result);
    } catch (error) {
      this.logger.error(
        `Falha ao atualizar local de estoque. Error: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao atualizar o local de estoque',
      );
    }
  }

  async changeStatusStockLocation(
    id: number,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<ResponseStockLocationDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const stockLocation = await this.stockLocationRepository.findById(id);

    if (!stockLocation) {
      throw new NotFoundException('Localização de estoque não encontrada');
    }
    if (stockLocation.isCentralStock === true) {
      throw new BadRequestException(
        'Não é possível atualizar o local de estoque central',
      );
    }
    if (stockLocation.stockLocationStatus === dto.status) {
      throw new ConflictException(
        'O status da localização de estoque já está definido como o status fornecido',
      );
    }

    stockLocation.stockLocationStatus = dto.status;
    stockLocation.userUpdated = user;

    try {
      const result = await this.stockLocationRepository.save(stockLocation);

      return toResponseStockLocationDto(result);
    } catch (error) {
      this.logger.error(
        `Falha ao alterar o status do local de estoque ${id}. Error: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao alterar o status do local de estoque',
      );
    }
  }
}
