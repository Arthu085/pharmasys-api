import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { StockLocationRepository } from '../../infrastructure/repositories/stock-location.repository';
import { StockLocationResponseDto } from '../dtos/stock-location-response.dto';
import { StockLocationUpdateDto } from '../dtos/stock-location-update.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneStockLocationUseCase } from './find-one-stock-location.use-case';
import { StockLocationDomainService } from '../../domain/services/stock-location-domain.service';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';

@Injectable()
export class UpdateStockLocationUseCase {
  constructor(
    private readonly stockLocationRepository: StockLocationRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly stockLocationDomainService: StockLocationDomainService,
  ) {}

  async execute(
    uuid: string,
    dto: StockLocationUpdateDto,
    userId: number,
  ): Promise<StockLocationResponseDto> {
    const user = await this.findOneUserUseCase.findById(userId);
    const stockLocation =
      await this.findOneStockLocationUseCase.findEntityByUuid(uuid);

    await this.stockLocationDomainService.validateStockLocationCentralStock(
      stockLocation,
    );

    if (dto.code && dto.code !== stockLocation.code) {
      const existingStockLocation =
        await this.findOneStockLocationUseCase.findByCode(dto.code);

      if (existingStockLocation) {
        await this.stockLocationDomainService.validateStockLocationSameCodeUpdate(
          stockLocation,
          existingStockLocation,
        );
      }
    }

    Object.assign(stockLocation, dto);

    stockLocation.userUpdated = user;
    stockLocation.updatedAt = new Date();

    const data = plainToInstance(
      StockLocationResponseDto,
      await this.stockLocationRepository.update(stockLocation),
      { excludeExtraneousValues: true },
    );

    return data;
  }

  async updateStatus(uuid: string, dto: ChangeStatusDto, userId: number) {
    const user = await this.findOneUserUseCase.findById(userId);
    const stockLocation =
      await this.findOneStockLocationUseCase.findEntityByUuid(uuid, false);

    await this.stockLocationDomainService.validateStockLocationCentralStock(
      stockLocation,
    );

    await this.stockLocationDomainService.validateStockLocationSameStatus(
      stockLocation,
      dto.status,
    );

    stockLocation.status = dto.status;
    stockLocation.userUpdated = user;
    stockLocation.updatedAt = new Date();

    await this.stockLocationRepository.update(stockLocation);
  }
}
