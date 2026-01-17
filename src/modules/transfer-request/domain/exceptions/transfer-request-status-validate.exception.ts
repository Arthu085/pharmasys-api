import { ConflictException } from '@nestjs/common';

export class TransferRequestStatusValidateException extends ConflictException {
  constructor() {
    super('Status inválido');
  }
}
