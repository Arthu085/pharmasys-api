import { BadRequestException } from '@nestjs/common';

export class InvalidInventoryEntryItemQuantityException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Quantidade inválida');
  }
}
