import { NotFoundException } from '@nestjs/common';

export class StockBalanceNotFoundException extends NotFoundException {
  constructor() {
    super('Estoque não encontrado');
  }
}
