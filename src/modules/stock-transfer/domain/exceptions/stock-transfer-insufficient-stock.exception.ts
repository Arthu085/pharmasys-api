import { ConflictException } from '@nestjs/common';

export class StockTransferInsufficientStockException extends ConflictException {
  constructor() {
    super('Quantidade insuficiente em estoque para a transferência');
  }
}
