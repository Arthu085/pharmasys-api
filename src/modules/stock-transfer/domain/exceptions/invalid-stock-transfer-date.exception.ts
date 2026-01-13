import { BadRequestException } from '@nestjs/common';

export class InvalidStockTransferDateException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Data de transferência inválida');
  }
}
