import { ConflictException } from '@nestjs/common';

export class TransferRequestStatusUpdateException extends ConflictException {
  constructor(message?: string) {
    super(
      message || 'Esse status não é válido para o atual status da requisição',
    );
  }
}
