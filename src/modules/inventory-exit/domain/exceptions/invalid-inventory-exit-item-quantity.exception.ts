import { BadRequestException } from '@nestjs/common';

export class InvalidInventoryExitItemQuantityException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Quantidade inválida');
  }
}
