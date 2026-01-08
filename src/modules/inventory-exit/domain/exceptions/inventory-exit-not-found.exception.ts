import { NotFoundException } from '@nestjs/common';

export class InventoryExitNotFoundException extends NotFoundException {
  constructor() {
    super('Saída de inventário não encontrada');
  }
}
