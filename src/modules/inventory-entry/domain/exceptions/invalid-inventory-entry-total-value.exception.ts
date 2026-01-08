import { BadRequestException } from '@nestjs/common';

export class InvalidInventoryEntryTotalValueException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Valor total inválido');
  }
}
