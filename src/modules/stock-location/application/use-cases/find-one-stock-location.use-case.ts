import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { StockLocationRepository } from '../../infrastructure/repositories/stock-location.repository';
import { StockLocationResponseDto } from '../dtos/stock-location-response.dto';
import { StockLocationDomainService } from '../../domain/services/stock-location-domain.service';
import { StockLocationEntity } from '../../domain/entities/stock-location.entity';

@Injectable()
export class FindOneStockLocationUseCase {
  constructor(
    private readonly stockLocationRepository: StockLocationRepository,
    private readonly stockLocationDomainService: StockLocationDomainService,
  ) {}

  async execute(uuid: string): Promise<StockLocationResponseDto> {
    const stockLocation = await this.stockLocationRepository.findOne(uuid);
    const validatedStockLocation =
      this.stockLocationDomainService.validateStockLocation(stockLocation);
    const activeStockLocation =
      this.stockLocationDomainService.validateStockLocationStatus(
        validatedStockLocation,
      );

    return plainToInstance(StockLocationResponseDto, activeStockLocation, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(
    uuid: string,
    validateActive = true,
  ): Promise<StockLocationEntity> {
    const stockLocation = await this.stockLocationRepository.findOne(uuid);
    const validatedStockLocation =
      this.stockLocationDomainService.validateStockLocation(stockLocation);

    if (validateActive) {
      return this.stockLocationDomainService.validateStockLocationStatus(
        validatedStockLocation,
      );
    }

    return validatedStockLocation;
  }

  async findByCode(code: string): Promise<StockLocationEntity | null> {
    return await this.stockLocationRepository.findByCode(code);
  }
}
