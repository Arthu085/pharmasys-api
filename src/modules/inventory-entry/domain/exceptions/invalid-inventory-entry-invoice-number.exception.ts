import { BadRequestException } from '@nestjs/common';

export class InvalidInventoryEntryInvoiceNumberException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Número da nota fiscal inválido');
  }
}
