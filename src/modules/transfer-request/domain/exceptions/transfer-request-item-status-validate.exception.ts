import { ConflictException } from '@nestjs/common';

export class TransferRequestItemStatusValidateException extends ConflictException {
  constructor() {
    super('Status inválido');
  }
}
