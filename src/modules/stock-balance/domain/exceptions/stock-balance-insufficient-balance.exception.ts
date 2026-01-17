import { ConflictException } from '@nestjs/common';

export class StockBalanceInsufficientBalanceException extends ConflictException {
  constructor() {
    super('Quantidade insuficiente no saldo de estoque');
  }
}
