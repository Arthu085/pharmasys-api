import { NotFoundException } from '@nestjs/common';

export class TransferRequestNotFoundException extends NotFoundException {
  constructor() {
    super('Requisição de transferência de estoque não encontrada');
  }
}
