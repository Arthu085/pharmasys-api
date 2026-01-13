import { NotFoundException } from '@nestjs/common';

export class StockTransferNotFoundException extends NotFoundException {
  constructor() {
    super('Transferência de estoque não encontrada');
  }
}
