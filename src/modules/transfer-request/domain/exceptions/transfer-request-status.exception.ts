import { ConflictException } from '@nestjs/common';

export class TransferRequestStatusException extends ConflictException {
  constructor() {
    super(
      'Somente é possível modificar requisições de transferência com status pendente',
    );
  }
}
