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
import { UpdateStockLocationDto } from '../DTOs/update.stock-location.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { ChangeStatusDto } from 'src/shared/DTOs/change-status.dto';
import { FilterStockLocationDto } from '../DTOs/filter.stock-location.dto';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';

@Injectable()
export class StockLocationService {
  private readonly logger = new Logger(StockLocationService.name);

  constructor(
    private readonly stockLocationRepository: StockLocationRepository,
    private readonly userService: UserService,
  ) {}

  async findAllStockLocations(
    filters: FilterStockLocationDto,
  ): Promise<IPaginatedResponse<ResponseStockLocationDto>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;
    const [stocks, total] = await this.stockLocationRepository.findAll(
      filters,
      limit,
      skip,
    );
    const data = stocks.map((user) => toResponseStockLocationDto(user));
    const lastPage = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage,
      },
    };
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
    const user = await this.userService.findByIdShared(userId);
    const existingStockLocationCode =
      await this.stockLocationRepository.findByCode(dto.code);

    if (existingStockLocationCode) {
      throw new ConflictException(
        'Já existe uma localização de estoque com este código',
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
    const user = await this.userService.findByIdShared(userId);
    const stockLocation = await this.stockLocationRepository.findById(id);

    if (!stockLocation) {
      throw new NotFoundException('Localização de estoque não encontrada');
    }

    if (stockLocation.status === StatusEnum.I) {
      throw new BadRequestException(
        'Não é possível alterar uma localização de estoque inativa',
      );
    }

    if (stockLocation.isCentralStock === true) {
      throw new BadRequestException(
        'Não é possível atualizar o local de estoque central',
      );
    }

    if (dto.name) {
      const conflictingName = await this.stockLocationRepository.findByName(
        dto.name,
      );

      if (conflictingName && conflictingName.id !== id) {
        throw new ConflictException(
          'Já existe uma localização de estoque com este nome',
        );
      }
    }

    if (dto.code) {
      const conflictingCode = await this.stockLocationRepository.findByCode(
        dto.code,
      );

      if (conflictingCode && conflictingCode.id !== id) {
        throw new ConflictException(
          'Já existe uma localização de estoque com este código',
        );
      }
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
    const user = await this.userService.findByIdShared(userId);
    const stockLocation = await this.stockLocationRepository.findById(id);

    if (!stockLocation) {
      throw new NotFoundException('Localização de estoque não encontrada');
    }

    if (stockLocation.isCentralStock === true) {
      throw new BadRequestException(
        'Não é possível atualizar o local de estoque central',
      );
    }

    if (stockLocation.status === dto.status) {
      throw new ConflictException(
        'O status da localização de estoque já está definido como o status fornecido',
      );
    }

    stockLocation.status = dto.status;
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
