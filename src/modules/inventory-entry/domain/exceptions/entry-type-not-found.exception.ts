import { NotFoundException } from '@nestjs/common';

export class EntryTypeNotFoundException extends NotFoundException {
  constructor() {
    super('Tipo de entrada não encontrado');
  }
}
