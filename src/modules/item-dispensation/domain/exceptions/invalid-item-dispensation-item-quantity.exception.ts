import { BadRequestException } from '@nestjs/common';

export class InvalidItemDispensationItemQuantityException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Quantidade inválida');
  }
}
