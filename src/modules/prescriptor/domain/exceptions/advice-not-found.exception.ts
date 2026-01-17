import { NotFoundException } from '@nestjs/common';

export class AdviceNotFoundException extends NotFoundException {
  constructor() {
    super('Conselho não encontrado');
  }
}
