import { NotFoundException } from '@nestjs/common';

export class ExitTypeNotFoundException extends NotFoundException {
  constructor() {
    super('Tipo de saída não encontrado');
  }
}
