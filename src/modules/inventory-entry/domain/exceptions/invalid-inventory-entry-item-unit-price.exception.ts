import { BadRequestException } from '@nestjs/common';

export class InvalidInventoryEntryItemUnitPriceException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Preço unitário inválido');
  }
}
