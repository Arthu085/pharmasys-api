import { Injectable } from '@nestjs/common';

import { StockTransferEntity } from '../entities/stock-transfer.entity';
import { StockTransferNotFoundException } from '../exceptions/stock-transfer-not-found.exception';

@Injectable()
export class StockTransferDomainService {
  constructor() {}

  validateStockTransfer(
    stockTransferEntity: StockTransferEntity | null,
  ): StockTransferEntity {
    if (!stockTransferEntity) {
      throw new StockTransferNotFoundException();
    }

    return stockTransferEntity;
  }
}
