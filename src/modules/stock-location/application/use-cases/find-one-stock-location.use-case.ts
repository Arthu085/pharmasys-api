import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IStockLocationRepository } from '../../domain/repositories/stock-location.repository.interface';
import { StockLocationResponseDto } from '../dtos/stock-location-response.dto';
import { StockLocationDomainService } from '../../domain/services/stock-location-domain.service';
import { StockLocationEntity } from '../../domain/entities/stock-location.entity';

@Injectable()
export class FindOneStockLocationUseCase {
  constructor(
    @Inject(IStockLocationRepository)
    private readonly stockLocationRepository: IStockLocationRepository,
    private readonly stockLocationDomainService: StockLocationDomainService,
  ) {}

  async execute(uuid: string): Promise<StockLocationResponseDto> {
    const stockLocation = await this.stockLocationRepository.findOne(uuid);
    const validatedStockLocation =
      this.stockLocationDomainService.validateStockLocationAndEnsureActive(
        stockLocation,
      );

    return plainToInstance(StockLocationResponseDto, validatedStockLocation, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(
    uuid: string,
    validateActive = true,
  ): Promise<StockLocationEntity> {
    const stockLocation = await this.stockLocationRepository.findOne(uuid);

    if (validateActive) {
      return this.stockLocationDomainService.validateStockLocationAndEnsureActive(
        stockLocation,
      );
    }

    return this.stockLocationDomainService.validateStockLocation(stockLocation);
  }

  async findByCode(code: string): Promise<StockLocationEntity | null> {
    return await this.stockLocationRepository.findByCode(code);
  }
}
