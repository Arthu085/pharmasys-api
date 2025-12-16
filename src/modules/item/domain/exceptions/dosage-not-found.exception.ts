import { NotFoundException } from '@nestjs/common';

export class DosageNotFoundException extends NotFoundException {
  constructor() {
    super('Dosagem não encontrada');
  }
}
