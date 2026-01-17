import { ConflictException } from '@nestjs/common';

export class TransferRequestItemUserException extends ConflictException {
  constructor() {
    super(
      'Somente o usuário que criou a requisição de transferência pode modificar seus itens',
    );
  }
}
