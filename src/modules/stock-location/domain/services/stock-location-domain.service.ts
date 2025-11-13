import { Injectable } from '@nestjs/common';
import { StockLocationEntity } from '../entities/stock-location.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { isCentralStockStockLocationException } from '../exceptions/is-central-stock-stock-location.exception';
import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';
import { ExistingGenericException } from 'src/shared/exceptions/existing.exception';

@Injectable()
export class StockLocationDomainService {
  constructor(private readonly baseDomainService: BaseDomainService) {}

  validateStockLocation(
    stockLocation: StockLocationEntity | null,
  ): StockLocationEntity {
    return this.baseDomainService.validateEntityExists(
      stockLocation,
      'Local de Estoque',
      'o',
    );
  }

  validateStockLocationStatus(
    stockLocation: StockLocationEntity,
  ): StockLocationEntity {
    return this.baseDomainService.validateEntityActive(
      stockLocation,
      'Local de Estoque',
      'o',
    );
  }

  validateStockLocationSameStatus(
    stockLocation: StockLocationEntity,
    status: StatusEnum,
  ): void {
    this.baseDomainService.validateDifferentStatus(stockLocation, status);
  }

  validateStockLocationCentralStock(stockLocation: StockLocationEntity): void {
    if (stockLocation.isCentralStock) {
      throw new isCentralStockStockLocationException();
    }
  }

  validateStockLocationSameCode(): void {
    throw new ExistingGenericException('local de estoque', 'o');
  }
}
