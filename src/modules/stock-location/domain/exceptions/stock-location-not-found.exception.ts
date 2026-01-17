import { NotFoundException } from '@nestjs/common';

export class StockLocationNotFoundException extends NotFoundException {
  constructor() {
    super('Local de estoque não encontrado');
  }
}
