import { BadRequestException } from '@nestjs/common';

export class InvalidInventoryEntryEntryDateException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Data de entrada inválida');
  }
}
