import { NotFoundException } from '@nestjs/common';

export class TypeNotFoundException extends NotFoundException {
  constructor() {
    super('Tipo não encontrado');
  }
}
