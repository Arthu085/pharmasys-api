import { NotFoundException } from '@nestjs/common';

export class TransferReasonNotFoundException extends NotFoundException {
  constructor() {
    super('Motivo de transferência de estoque não encontrado');
  }
}
