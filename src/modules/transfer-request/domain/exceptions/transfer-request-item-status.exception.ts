import { ConflictException } from '@nestjs/common';

export class TransferRequestItemStatusException extends ConflictException {
  constructor() {
    super(
      'Somente é possível modificar itens de requisições de transferência com status aberto',
    );
  }
}
