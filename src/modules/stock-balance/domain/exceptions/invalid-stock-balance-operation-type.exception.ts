import { BadRequestException } from '@nestjs/common';

export class InvalidStockBalanceOperationTypeException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Tipo de operação inválido');
  }
}
