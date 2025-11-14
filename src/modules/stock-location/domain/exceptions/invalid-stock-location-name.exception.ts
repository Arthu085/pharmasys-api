import { BadRequestException } from '@nestjs/common';

export class InvalidStockLocationNameException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Nome de local de estoque inválido');
  }
}
