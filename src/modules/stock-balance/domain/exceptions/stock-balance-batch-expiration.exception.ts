import { ConflictException } from '@nestjs/common';

export class StockBalanceBatchExpirationException extends ConflictException {
  constructor() {
    super('Lote expirado, não é possível fazer uma movimentação de saldo');
  }
}
