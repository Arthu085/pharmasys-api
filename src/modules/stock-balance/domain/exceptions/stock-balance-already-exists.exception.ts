import { ConflictException } from '@nestjs/common';

export class StockBalanceAlreadyExistsException extends ConflictException {
  constructor() {
    super(
      'Já existe um estoque cadastrado para este item com este lote e local de estoque',
    );
  }
}
