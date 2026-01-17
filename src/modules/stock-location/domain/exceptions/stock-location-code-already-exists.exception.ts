import { ConflictException } from '@nestjs/common';

export class StockLocationCodeAlreadyExistsException extends ConflictException {
  constructor() {
    super('Já existe um local de estoque cadastrado com este código');
  }
}
