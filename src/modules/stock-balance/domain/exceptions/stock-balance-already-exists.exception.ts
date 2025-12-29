import { ConflictException } from '@nestjs/common';

export class StockBalanceAlreadyExistsException extends ConflictException {
  constructor() {
    super('Já existe um estoque cadastrado com este lote e local de estoque');
  }
}
