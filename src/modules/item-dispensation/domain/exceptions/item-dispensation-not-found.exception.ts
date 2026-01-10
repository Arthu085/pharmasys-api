import { NotFoundException } from '@nestjs/common';

export class ItemDispensationNotFoundException extends NotFoundException {
  constructor() {
    super('Saída de dispensação não encontrada');
  }
}
