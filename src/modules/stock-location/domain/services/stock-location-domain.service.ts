import { Injectable } from '@nestjs/common';
import { StockLocationEntity } from '../entities/stock-location.entity';
import { NotFoundGenericException } from 'src/shared/exceptions/not-found.exception';
import { SameCodeStockLocationException } from '../exceptions/same-code-stock-location.exception';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { InactiveGenericException } from 'src/shared/exceptions/inactive.exception';
import { isCentralStockStockLocationException } from '../exceptions/is-central-stock-stock-location.exception';
import { SameStatusException } from 'src/shared/exceptions/same-status.exception';

@Injectable()
export class StockLocationDomainService {
  async validateStockLocation(
    stockLocation: StockLocationEntity | null,
  ): Promise<StockLocationEntity> {
    if (!stockLocation) {
      throw new NotFoundGenericException('Local de Estoque', 'o');
    }

    return stockLocation;
  }

  async validateStockLocationStatus(
    stockLocation: StockLocationEntity,
  ): Promise<StockLocationEntity> {
    if (stockLocation.status === StatusEnum.INATIVO) {
      throw new InactiveGenericException('Local de Estoque', 'o');
    }

    return stockLocation;
  }

  async validateStockLocationSameCode(
    stockLocation: StockLocationEntity,
    code: string,
  ): Promise<void> {
    if (stockLocation.code === code) {
      throw new SameCodeStockLocationException();
    }
  }

  async validateStockLocationSameCodeUpdate(
    stockLocation: StockLocationEntity,
    stockLocationCode: StockLocationEntity,
  ): Promise<void> {
    if (stockLocationCode.id !== stockLocation.id) {
      throw new SameCodeStockLocationException();
    }
  }

  async validateStockLocationCentralStock(
    stockLocation: StockLocationEntity,
  ): Promise<void> {
    if (stockLocation.isCentralStock) {
      throw new isCentralStockStockLocationException();
    }
  }

  async validateStockLocationSameStatus(
    stockLocation: StockLocationEntity,
    status: StatusEnum,
  ): Promise<void> {
    if (stockLocation.status === status) {
      throw new SameStatusException();
    }
  }
}
