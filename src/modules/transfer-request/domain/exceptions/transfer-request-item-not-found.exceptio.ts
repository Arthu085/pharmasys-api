import { NotFoundException } from '@nestjs/common';

export class TransferRequestItemNotFoundException extends NotFoundException {
  constructor() {
    super('Item da requisição de transferência de estoque não encontrada');
  }
}
