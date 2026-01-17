import { BadRequestException } from '@nestjs/common';

export class InvalidTransferRequestItemQuantityException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Quantidade inválida');
  }
}
