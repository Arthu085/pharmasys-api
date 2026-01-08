import { NotFoundException } from '@nestjs/common';

export class InventoryEntryNotFoundException extends NotFoundException {
  constructor() {
    super('Entrada de inventário não encontrada');
  }
}
