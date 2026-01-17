import { NotFoundException } from '@nestjs/common';

export class BatchNotFoundException extends NotFoundException {
  constructor() {
    super('Lote não encontrado');
  }
}
