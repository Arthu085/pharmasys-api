import { Injectable } from '@nestjs/common';
import { StockLocationRepository } from '../../infrastructure/repositories/stock-location.repository';
import { FindOneStockLocationUseCase } from './find-one-stock-location.use-case';
import { StockLocationDomainService } from '../../domain/services/stock-location-domain.service';

@Injectable()
export class DeleteStockLocationUseCase {
  constructor(
    private readonly stockLocationRepository: StockLocationRepository,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly stockLocationDomainService: StockLocationDomainService,
  ) {}

  async execute(uuid: string): Promise<void> {
    const stockLocation =
      await this.findOneStockLocationUseCase.findEntityByUuid(uuid, false);

    await this.stockLocationDomainService.validateStockLocationCentralStock(
      stockLocation,
    );

    await this.stockLocationRepository.softDelete(uuid);
  }
}
