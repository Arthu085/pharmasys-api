import { NotFoundException } from '@nestjs/common';

export class SubtypeNotFoundException extends NotFoundException {
  constructor() {
    super('Subtipo não encontrado');
  }
}
