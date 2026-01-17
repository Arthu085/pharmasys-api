import { BadRequestException } from '@nestjs/common';

export class InvalidStockBalanceQuantityException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Quantidade de saldo de estoque inválida');
  }
}
