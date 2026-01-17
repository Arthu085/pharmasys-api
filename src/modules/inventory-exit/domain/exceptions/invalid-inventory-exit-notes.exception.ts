import { BadRequestException } from '@nestjs/common';

export class InvalidInventoryExitNotesException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Notas de saída inválidas');
  }
}
