import { NotFoundException } from '@nestjs/common';

export class PrescriptorNotFoundException extends NotFoundException {
  constructor() {
    super('Prescritor não encontrado');
  }
}
