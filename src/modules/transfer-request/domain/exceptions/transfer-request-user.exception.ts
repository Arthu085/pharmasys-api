import { ConflictException } from '@nestjs/common';

export class TransferRequestUserException extends ConflictException {
  constructor() {
    super(
      'Somente o usuário que criou a requisição de transferência pode modificá-la',
    );
  }
}
