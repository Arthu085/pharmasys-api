import { NotFoundException } from '@nestjs/common';

export class PresentationNotFoundException extends NotFoundException {
  constructor() {
    super('Apresentação não encontrada');
  }
}
