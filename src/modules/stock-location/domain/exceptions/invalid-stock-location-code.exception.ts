import { BadRequestException } from '@nestjs/common';

export class InvalidStockLocationCodeException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Código de local de estoque inválido');
  }
}
