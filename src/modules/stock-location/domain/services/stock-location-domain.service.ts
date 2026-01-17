import { Injectable } from '@nestjs/common';
import { StockLocationEntity } from '../entities/stock-location.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { isCentralStockStockLocationException } from '../exceptions/is-central-stock-stock-location.exception';
import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';
import { StockLocationNotFoundException } from '../exceptions/stock-location-not-found.exception';
import { StockLocationCodeAlreadyExistsException } from '../exceptions/stock-location-code-already-exists.exception';

@Injectable()
export class StockLocationDomainService {
  constructor(private readonly baseDomainService: BaseDomainService) {}

  validateStockLocation(
    stockLocation: StockLocationEntity | null,
  ): StockLocationEntity {
    if (!stockLocation) {
      throw new StockLocationNotFoundException();
    }

    return stockLocation;
  }

  validateStockLocationAndEnsureActive(
    stockLocation: StockLocationEntity | null,
  ): StockLocationEntity {
    const validated = this.validateStockLocation(stockLocation);
    validated.ensureIsActive();

    return validated;
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

  validateExistsStockLocationCreate(
    stockLocation: StockLocationEntity | null,
  ): void {
    if (stockLocation) {
      throw new StockLocationCodeAlreadyExistsException();
    }
  }

  validateExistsStockLocationUpdate(
    updateStockLocation: StockLocationEntity | null,
    existingStockLocation: StockLocationEntity | null,
  ): void {
    if (
      updateStockLocation &&
      existingStockLocation &&
      updateStockLocation.id !== existingStockLocation.id
    ) {
      throw new StockLocationCodeAlreadyExistsException();
    }
  }
}
