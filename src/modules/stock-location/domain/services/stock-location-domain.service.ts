import { Injectable } from '@nestjs/common';
import { StockLocationEntity } from '../entities/stock-location.entity';
import { SameCodeStockLocationException } from '../exceptions/same-code-stock-location.exception';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { isCentralStockStockLocationException } from '../exceptions/is-central-stock-stock-location.exception';
import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';

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

  validateStockLocationCentralStock(stockLocation: StockLocationEntity): void {
    if (stockLocation.isCentralStock) {
      throw new isCentralStockStockLocationException();
    }
  }

  validateStockLocationSameCode(): void {
    throw new SameCodeStockLocationException();
  }

  validateStockLocationSameCodeUpdate(
    currentStockLocation: StockLocationEntity,
    existingStockLocation: StockLocationEntity,
  ): void {
    if (existingStockLocation.id !== currentStockLocation.id) {
      throw new SameCodeStockLocationException();
    }
  }

  validateStockLocationSameStatus(
    stockLocation: StockLocationEntity,
    status: StatusEnum,
  ): void {
    this.baseDomainService.validateDifferentStatus(stockLocation, status);
  }
}
