import { BadRequestException } from '@nestjs/common';

export class InvalidTransferRequestDateException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Data de requisição de transferência inválida');
  }
}
