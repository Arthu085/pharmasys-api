import { ConflictException } from '@nestjs/common';

export class SameCodeStockLocationException extends ConflictException {
  constructor() {
    super('Já existe um local de estoque com este código.');
  }
}
