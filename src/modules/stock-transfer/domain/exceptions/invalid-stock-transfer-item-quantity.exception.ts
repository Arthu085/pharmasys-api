import { BadRequestException } from '@nestjs/common';

export class InvalidStockTransferItemQuantityException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Quantidade inválida');
  }
}
